import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isLikelyMongoConnectionFailure } from '@/lib/mongo-url';

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
    const product = await prisma.product.create({
      data
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
