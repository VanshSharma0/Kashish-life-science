import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isLikelyMongoConnectionFailure } from '@/lib/mongo-url';
import { resolveProductVariants } from '@/lib/productCatalog';

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
    const allProducts = await prisma.product.findMany({
      orderBy: [{ variantSort: 'asc' }, { price: 'asc' }],
    });
    let variants;
    try {
      variants = resolveProductVariants(product, allProducts);
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
