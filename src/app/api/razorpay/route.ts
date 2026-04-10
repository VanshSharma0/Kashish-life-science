import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export async function POST(req: NextRequest) {
  try {
    const { items, totalAmount, userId, customerName, email, phone } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const options = {
      amount: Math.round(totalAmount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };
    
    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        customerName,
        email,
        phone,
        items,
        totalAmount,
        razorpayOrderId: razorpayOrder.id,
        status: 'pending'
      }
    });

    return NextResponse.json({ order: razorpayOrder, dbOrderId: newOrder.id }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
