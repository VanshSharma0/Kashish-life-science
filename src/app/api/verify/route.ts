import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // For mongodb objectId filtering with updateMany or findFirst etc
      // Since razorpayOrderId isn't strictly unique defined in schema we use updateMany
      await prisma.order.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { 
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id
        }
      });
      return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
    } else {
      await prisma.order.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: { status: 'failed' }
      });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
