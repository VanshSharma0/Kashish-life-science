import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';
import type { CartItem } from '@/store/cartStore';
import type { CustomerProfile } from '@/lib/customerProfile';

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

type CreateRazorpayOrderPayload = {
  items: CartItem[];
  totalAmount: number;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  profile?: CustomerProfile;
};

export async function POST(req: NextRequest) {
  try {
    const {
      items,
      totalAmount,
      userId,
      customerName,
      email,
      phone,
      profile,
    } = (await req.json()) as CreateRazorpayOrderPayload;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return NextResponse.json({ error: 'Invalid total amount' }, { status: 400 });
    }

    if (!customerName || !email || !phone) {
      return NextResponse.json({ error: 'Missing customer details' }, { status: 400 });
    }

    const orderItems = items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const hasInvalidItems = orderItems.some(
      (item) =>
        !item.productId ||
        !item.name ||
        !Number.isFinite(item.price) ||
        item.price <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
    );
    if (hasInvalidItems) {
      return NextResponse.json({ error: 'Invalid cart item data' }, { status: 400 });
    }

    const razorpay = getRazorpayClient();

    const options = {
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        fullName: profile?.fullName || customerName,
        phone: profile?.phone || phone,
        addressLine1: profile?.addressLine1 || '',
        addressLine2: profile?.addressLine2 || '',
        city: profile?.city || '',
        state: profile?.state || '',
        pincode: profile?.pincode || '',
        landmark: profile?.landmark || '',
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        customerName,
        email,
        phone,
        items: orderItems,
        totalAmount,
        razorpayOrderId: razorpayOrder.id,
        status: 'pending',
      },
    });

    return NextResponse.json({ order: razorpayOrder, dbOrderId: newOrder.id }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const message =
      error instanceof Error ? error.message : 'Internal server error while creating order';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
