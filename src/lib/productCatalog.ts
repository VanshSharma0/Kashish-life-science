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
    const oa = a.variantSort ?? 0;
    const ob = b.variantSort ?? 0;
    if (oa !== ob) return oa - ob;
    return (Number(a.price) || 0) - (Number(b.price) || 0);
  });
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
  let catalogTitle = first.catalogTitle?.trim();
  if (!catalogTitle && v.length > 1) {
    catalogTitle = stripPackSuffixFromName(first.name);
  }
  if (!catalogTitle) catalogTitle = first.name ?? "Product";
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
  return {
    canonicalId: p.id,
    catalogTitle: p.catalogTitle?.trim() || p.name,
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
  let s = name.trim();
  const steps = [
    /\s+\d+(\s*[×x]\s*\d+)+.*$/i,
    /\s+\d+\s*[×x]\s*\d+.*$/i,
    /\s+\d+\s*gm\b.*$/i,
    /\s+[\d.]+\s*(kg|g|ml|ltr|Ltr|L)\b.*$/i,
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

/** Compact quantity line for cards: "100 ml · 500 ml · 1 L" */
export function formatVariantQuantities(variants: ProductType[]): string {
  const labels = variants
    .map((v) => v.quantity?.trim())
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
