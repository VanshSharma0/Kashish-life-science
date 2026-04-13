/**
 * Returns text safe to show on the public product page: one short line or paragraph.
 * Hides stored full-composition breakdowns (multi-line nutrient lists).
 */
export function getDisplayComposition(
  composition: string | null | undefined
): string | null {
  if (!composition?.trim()) return null;

  const lines = composition
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return null;

  // Lines that look like "Name – 123 mg" / "Name - 50 IU" ingredient rows
  const nutrientLine = (line: string) =>
    /[–\u2013\u2014-]/.test(line) &&
    /\d/.test(line) &&
    /(mg|IU|mcg|gm|g|ml|ltr|CFU|kg|%)/i.test(line);

  const nutrientRows = lines.filter(nutrientLine).length;
  if (nutrientRows >= 3) return null;
  if (lines.length >= 8 && nutrientRows >= 1) return null;
  if (lines.length >= 12) return null;

  return lines.join(' ');
}
