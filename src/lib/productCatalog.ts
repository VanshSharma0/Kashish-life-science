import type { ProductType } from "@/lib/data";

export type CatalogGroup = {
  /** First variant id (lowest price) for links and default selection */
  canonicalId: string;
  catalogTitle: string;
  type: string;
  description: string;
  variants: ProductType[];
  minPrice: number;
  maxPrice: number;
};

export function sortVariants(variants: ProductType[]): ProductType[] {
  return [...variants].sort((a, b) => {
    const qa = getQuantitySortValue(a.quantity);
    const qb = getQuantitySortValue(b.quantity);
    if (qa !== qb) return qa - qb;

    const oa = a.variantSort ?? 0;
    const ob = b.variantSort ?? 0;
    if (oa !== ob) return oa - ob;
    return (Number(a.price) || 0) - (Number(b.price) || 0);
  });
}

function getQuantitySortValue(quantity: string | null | undefined): number {
  if (!quantity?.trim()) return Number.POSITIVE_INFINITY;

  const text = quantity.trim().toLowerCase();
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match) return Number.POSITIVE_INFINITY;

  const value = Number(match[1]);
  if (!Number.isFinite(value)) return Number.POSITIVE_INFINITY;

  if (/(ltr|litre|liter)\b/.test(text)) return value * 1000;
  if (/\bl\b/.test(text)) return value * 1000;
  if (/\bml\b/.test(text)) return value;
  if (/\bkg\b/.test(text)) return value * 1000;
  if (/\bgm\b|\bg\b/.test(text)) return value;

  return value;
}

/** All pack sizes for one catalog line (used on product detail when opening any variant id). */
export function resolveProductVariants(
  product: ProductType,
  allProducts: ProductType[]
): ProductType[] {
  const gid = product.variantGroupId?.trim();
  if (gid) {
    const v = allProducts.filter((p) => p.variantGroupId?.trim() === gid);
    if (v.length) return sortVariants(v);
  }
  const ct = product.catalogTitle?.trim();
  if (ct) {
    const v = allProducts.filter((p) => p.catalogTitle?.trim() === ct);
    if (v.length > 1) return sortVariants(v);
  }
  const key = stripPackSuffixFromName(product.name);
  if (!key) return [product];
  const v = allProducts.filter(
    (p) => stripPackSuffixFromName(p.name) === key
  );
  if (v.length > 1) return sortVariants(v);
  return [product];
}

function buildGroup(variants: ProductType[]): CatalogGroup {
  const v = sortVariants(variants);
  const first = v[0];
  const prices = v.map((x) => x.price);
  const bestVariantTitle = deriveBestVariantTitle(v);
  const strippedName = bestVariantTitle || first.name || "Product";
  let catalogTitle = first.catalogTitle?.trim();

  if (catalogTitle && shouldPreferNameOverCatalogTitle(strippedName, catalogTitle)) {
    catalogTitle = strippedName;
  }

  if (!catalogTitle && v.length > 1) {
    catalogTitle = strippedName;
  }
  if (!catalogTitle) catalogTitle = strippedName;
  return {
    canonicalId: first.id,
    catalogTitle,
    type: first.type,
    description: first.description,
    variants: v,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

function singleton(p: ProductType): CatalogGroup {
  const strippedName = deriveBestVariantTitle([p]) || p.name || "Product";
  const rawCatalogTitle = p.catalogTitle?.trim() || "";
  const catalogTitle =
    rawCatalogTitle && !shouldPreferNameOverCatalogTitle(strippedName, rawCatalogTitle)
      ? rawCatalogTitle
      : strippedName;

  return {
    canonicalId: p.id,
    catalogTitle,
    type: p.type,
    description: p.description,
    variants: [p],
    minPrice: p.price,
    maxPrice: p.price,
  };
}

/**
 * Strips trailing pack size from display name so variants of the same line cluster
 * when `variantGroupId` / `catalogTitle` are missing in older DB rows.
 */
export function stripPackSuffixFromName(name: string | null | undefined): string {
  if (name == null || typeof name !== "string") return "";
  let s = name
    .trim()
    .replace(/\bliq\.?\b/gi, "Liquid")
    .replace(/\s+/g, " ");
  const steps = [
    /\s*[-–—]?\s*\d+(?:\.\d+)?\s*(kg|g|gm|ml|ltr|litre|liter|l)\b.*$/i,
    /\s+\d+(\s*[×x]\s*\d+)+.*$/i,
    /\s+\d+\s*[×x]\s*\d+.*$/i,
    /\s+\d+\s*gm\b.*$/i,
    /\s*[\d.]+\s*(kg|g|ml|gm|ltr|litre|liter|Ltr|L)\b.*$/i,
    /\s+\d+\s*bolus\b.*$/i,
    /\s+\([^)]+\)\s*$/i,
  ];
  for (const re of steps) {
    const next = s.replace(re, "").trim();
    if (next.length >= 3) s = next;
  }
  return s;
}

/**
 * One row per catalog group:
 * 1) Merge by `variantGroupId`
 * 2) Merge remaining rows that share the same `catalogTitle` (2+ rows)
 * 3) Merge remaining rows that share the same `stripPackSuffixFromName(name)` (2+ rows)
 * 4) Singletons
 */
export function groupProductsForCatalog(products: ProductType[]): CatalogGroup[] {
  if (products.length === 0) return [];

  const used = new Set<string>();
  const groups: CatalogGroup[] = [];

  // 1) variantGroupId
  const byVg = new Map<string, ProductType[]>();
  for (const p of products) {
    const gid = p.variantGroupId?.trim();
    if (!gid) continue;
    const list = byVg.get(gid) ?? [];
    list.push(p);
    byVg.set(gid, list);
  }
  for (const variants of byVg.values()) {
    if (variants.length === 0) continue;
    const v = sortVariants(variants);
    for (const x of v) used.add(x.id);
    groups.push(buildGroup(v));
  }

  const remainingAfterVg = () => products.filter((p) => !used.has(p.id));

  // 2) catalogTitle (identical, 2+ products)
  const byCt = new Map<string, ProductType[]>();
  for (const p of remainingAfterVg()) {
    const ct = p.catalogTitle?.trim();
    if (!ct) continue;
    const list = byCt.get(ct) ?? [];
    list.push(p);
    byCt.set(ct, list);
  }
  for (const variants of byCt.values()) {
    if (variants.length < 2) continue;
    const v = sortVariants(variants);
    for (const x of v) used.add(x.id);
    groups.push(buildGroup(v));
  }

  // 3) inferred line key from name
  const byLine = new Map<string, ProductType[]>();
  for (const p of products.filter((x) => !used.has(x.id))) {
    const key = stripPackSuffixFromName(p.name);
    if (key.length < 6) continue;
    const list = byLine.get(key) ?? [];
    list.push(p);
    byLine.set(key, list);
  }
  for (const variants of byLine.values()) {
    if (variants.length < 2) continue;
    const v = sortVariants(variants);
    for (const x of v) used.add(x.id);
    groups.push(buildGroup(v));
  }

  // 4) singletons
  for (const p of products) {
    if (!used.has(p.id)) {
      used.add(p.id);
      groups.push(singleton(p));
    }
  }

  groups.sort((a, b) =>
    formatTitleSortKey(a.catalogTitle).localeCompare(
      formatTitleSortKey(b.catalogTitle),
      undefined,
      { sensitivity: "base" }
    )
  );

  return groups;
}

function formatTitleSortKey(title: string): string {
  return title.replace(/[™®]/g, "").trim().toLowerCase();
}

function shouldPreferNameOverCatalogTitle(
  strippedName: string,
  catalogTitle: string
): boolean {
  const nameTokens = tokenizeTitle(strippedName);
  const catalogTokens = tokenizeTitle(catalogTitle);
  if (nameTokens.length === 0 || catalogTokens.length === 0) return false;

  const nameSet = new Set(nameTokens);
  const catalogSet = new Set(catalogTokens);

  let shared = 0;
  for (const t of catalogSet) {
    if (nameSet.has(t)) shared += 1;
  }

  const allCatalogWordsPresent = shared === catalogSet.size;
  const hasExtraNameWords = nameSet.size > catalogSet.size;
  return allCatalogWordsPresent && hasExtraNameWords;
}

function tokenizeTitle(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[™®]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function deriveBestVariantTitle(variants: ProductType[]): string {
  const candidates = variants
    .map((v) => stripPackSuffixFromName(v.name))
    .filter((v) => v.length > 0);
  if (!candidates.length) return "";

  const best = [...new Set(candidates)].sort((a, b) => {
    const tokenDelta = tokenizeTitle(b).length - tokenizeTitle(a).length;
    if (tokenDelta !== 0) return tokenDelta;
    return b.length - a.length;
  })[0];

  return best || candidates[0];
}

export function normalizeQuantityLabel(quantity: string | null | undefined): string {
  if (!quantity?.trim()) return "";

  return quantity
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b(lit\.?|ltrs?\.?|ltr\.?|litre?s?|liter?s?)\b/gi, "litre")
    .replace(/\bmls?\b/gi, "ml")
    .replace(/\bkgs?\b/gi, "kg")
    .replace(/\bgms?\b/gi, "gm");
}

/** Compact quantity line for cards: "100 ml · 500 ml · 1 L" */
export function formatVariantQuantities(variants: ProductType[]): string {
  const labels = variants
    .map((v) => normalizeQuantityLabel(v.quantity))
    .filter((q): q is string => Boolean(q));
  if (labels.length === 0) return "";
  const unique = [...new Set(labels)];
  return unique.join(" · ");
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return `₹${min}`;
  return `From ₹${min}`;
}

export function formatTypeLabel(variants: ProductType[]): string {
  const types = [...new Set(variants.map((v) => v.type))];
  if (types.length === 1) return types[0];
  return types.join(" · ");
}
