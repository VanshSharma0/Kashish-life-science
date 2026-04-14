import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isLikelyMongoConnectionFailure } from '@/lib/mongo-url';
import { resolveProductVariants, stripPackSuffixFromName } from '@/lib/productCatalog';
import type { ProductType } from '@/lib/data';

async function fetchLikelyVariants(product: ProductType): Promise<ProductType[]> {
  const gid = product.variantGroupId?.trim();
  if (gid) {
    const byGroupId = await prisma.product.findMany({
      where: { variantGroupId: gid },
      orderBy: [{ variantSort: 'asc' }, { price: 'asc' }],
    });
    if (byGroupId.length) return byGroupId;
  }

  const title = product.catalogTitle?.trim();
  if (title) {
    const byCatalogTitle = await prisma.product.findMany({
      where: { catalogTitle: title },
      orderBy: [{ variantSort: 'asc' }, { price: 'asc' }],
    });
    if (byCatalogTitle.length > 1) return byCatalogTitle;
  }

  const nameKey = stripPackSuffixFromName(product.name);
  if (nameKey.length >= 6) {
    // Legacy rows may not have variantGroupId/catalogTitle, so use a narrowed name match.
    const byNamePrefix = await prisma.product.findMany({
      where: { name: { startsWith: nameKey } },
      orderBy: [{ variantSort: 'asc' }, { price: 'asc' }],
    });
    if (byNamePrefix.length > 1) {
      const strict = byNamePrefix.filter(
        (p) => stripPackSuffixFromName(p.name) === nameKey
      );
      if (strict.length > 1) return strict;
    }
  }

  return [product];
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    let variants;
    try {
      variants = await fetchLikelyVariants(product);
      if (!variants.length) variants = [product];

      // Fallback for uncommon legacy naming data where targeted queries miss siblings.
      if (variants.length <= 1) {
        const allProducts = await prisma.product.findMany({
          orderBy: [{ variantSort: 'asc' }, { price: 'asc' }],
        });
        variants = resolveProductVariants(product, allProducts);
      }
    } catch (resolveErr) {
      console.error('[api/products/[id]] resolveProductVariants:', resolveErr);
      variants = [product];
    }
    if (!variants.length) {
      variants = [product];
    }
    return NextResponse.json({ product, variants });
  } catch (error: unknown) {
    if (isLikelyMongoConnectionFailure(error)) {
      return NextResponse.json(
        { error: 'Database unreachable' },
        { status: 503 }
      );
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    // Check existence or catch exception for not found
    try {
      const product = await prisma.product.update({
        where: { id },
        data
      });
      return NextResponse.json(product);
    } catch (e) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    try {
      await prisma.product.delete({
        where: { id }
      });
      return NextResponse.json({ success: true });
    } catch (e) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
