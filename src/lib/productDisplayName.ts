/**
 * Apply brand marks: KB-MAST®, KB POWER®, KBAH/KB AH®, KB-ORE®; KB-CONC™ and JEARSOL™.
 * Safe to call repeatedly (won't double-append marks).
 */
export function formatProductDisplayName(raw: string): string {
  if (!raw?.trim()) return raw;

  let s = raw.trim();

  // KB-CONC™ and JEARSOL™ (trademark, not registered)
  s = s.replace(/\bKB-CONC(?!®|™)/gi, "KB-CONC™");
  s = s.replace(/\bJEARSOL(?!®|™)/gi, "JEARSOL™");

  // KB-MAST® (covers KB-MAST, KB MAST)
  s = s.replace(/\bKB[- ]?MAST(?!®|™)/gi, "KB-MAST®");

  // KB POWER®
  s = s.replace(/\bKB\s*POWER(?!®|™)/gi, "KB POWER®");

  // KBAH® / KB AH®
  s = s.replace(/\bKBAH(?!®|™)/gi, "KBAH®");
  s = s.replace(/\bKB\s+AH(?!®|™)/gi, "KB AH®");

  // KB-ORE® (after KB-MAST so we don't touch unrelated strings)
  s = s.replace(/\bKB-ORE(?!®|™)/gi, "KB-ORE®");

  // Legacy ordering: "Chelated KB-ORE®" → "KB-ORE® Chelated"
  s = s.replace(/\bChelated\s+KB-ORE®/gi, "KB-ORE® Chelated");

  return s;
}

/** Title for cart/checkout: catalog-style name + pack size when the DB stores them separately. */
export function buildCartProductLabel(input: {
  name: string;
  catalogTitle?: string | null;
  quantity?: string | null;
}): string {
  const title = formatProductDisplayName(
    input.catalogTitle?.trim() || input.name?.trim() || "Product"
  );
  const q = input.quantity?.trim();
  return q ? `${title} · ${q}` : title;
}
