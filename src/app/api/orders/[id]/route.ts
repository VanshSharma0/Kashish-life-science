import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

function asString(value: unknown) {
  if (value === null || value === undefined) return '';
  return typeof value === 'string' ? value : String(value);
}

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not configured');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const order = await prisma.order.findFirst({ where: { id } });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    let profile = {
      fullName: asString(order.customerName),
      phone: asString(order.phone),
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    };

    if (order.razorpayOrderId) {
      try {
        const razorpay = getRazorpayClient();
        const razorpayOrder = await razorpay.orders.fetch(order.razorpayOrderId);
        const notes = razorpayOrder.notes || {};

        profile = {
          fullName: asString(notes.fullName || order.customerName),
          phone: asString(notes.phone || order.phone),
          addressLine1: asString(notes.addressLine1),
          addressLine2: asString(notes.addressLine2),
          city: asString(notes.city),
          state: asString(notes.state),
          pincode: asString(notes.pincode),
          landmark: asString(notes.landmark),
        };
      } catch {
        // Keep fallback profile from DB fields.
      }
    }

    return NextResponse.json({ ...order, profile });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch order details';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
