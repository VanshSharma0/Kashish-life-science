import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

function getRazorpaySecret() {
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured');
  }

  return secret;
}

type VerifyPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      (await req.json()) as VerifyPayload;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment verification fields' }, { status: 400 });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac('sha256', getRazorpaySecret())
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      await prisma.order.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id,
        },
      });
      return NextResponse.json({ message: 'Payment verified successfully' }, { status: 200 });
    } else {
      await prisma.order.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { status: 'failed' },
      });
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
