import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
