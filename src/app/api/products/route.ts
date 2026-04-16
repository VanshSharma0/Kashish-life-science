import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isLikelyMongoConnectionFailure } from '@/lib/mongo-url';
import { stripPackSuffixFromName } from '@/lib/productCatalog';

function buildVariantFamilyKey(name: string) {
  const base = stripPackSuffixFromName(name || '')
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!base) return '';

  const tokens = base
    .split(/[\s-]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    // Treat "plus" as optional so Advance and Advance+ can group.
    .filter((t) => t !== 'plus');

  return [...new Set(tokens)].sort().join('-');
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error: unknown) {
    if (isLikelyMongoConnectionFailure(error)) {
      console.warn('[api/products] Database unreachable — returning empty list:', error);
      return NextResponse.json([]);
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const normalizedName = stripPackSuffixFromName(data?.name).toLowerCase();
    const familyKey = buildVariantFamilyKey(data?.name || '');

    if (normalizedName || familyKey) {
      const allProducts = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
      const template =
        allProducts.find((p) => stripPackSuffixFromName(p.name).toLowerCase() === normalizedName) ??
        allProducts.find((p) => (p.catalogTitle?.trim().toLowerCase() || '') === normalizedName) ??
        allProducts.find((p) => buildVariantFamilyKey(p.name) === familyKey) ??
        allProducts.find((p) => buildVariantFamilyKey(p.catalogTitle || '') === familyKey) ??
        null;

      if (template) {
        data.description = data.description || template.description;
        data.dosage = data.dosage || template.dosage;
        data.imageUrl = data.imageUrl || template.imageUrl;
        data.type = data.type || template.type;
        data.benefits = Array.isArray(data.benefits) && data.benefits.length
          ? data.benefits
          : template.benefits;
        data.catalogTitle =
          data.catalogTitle ||
          template.catalogTitle ||
          stripPackSuffixFromName(template.name);
        data.variantGroupId =
          data.variantGroupId ||
          template.variantGroupId ||
          `auto-${(template.catalogTitle || normalizedName).replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
      }
    }

    const baseKey = stripPackSuffixFromName(data?.name || '');
    if (!data.variantGroupId && baseKey) {
      const key = familyKey || baseKey.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      data.variantGroupId = `auto-${key}`;
    }
    if (!data.catalogTitle && baseKey) {
      data.catalogTitle = baseKey;
    }

    const product = await prisma.product.create({
      data
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
