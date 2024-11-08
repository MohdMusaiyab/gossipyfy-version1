import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';

const verifyOrderSchema = z.object({
  razorpayPaymentId: z.string(),
  razorpayOrderId: z.string(),
  razorpaySignature: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = verifyOrderSchema.parse(body);

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error('RAZORPAY_KEY_SECRET is not set');
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { razorpayOrderId },
      data: {
        status: 'paid',
        razorpayPaymentId,
        razorpaySignature,
        subscriptionExpiry: new Date(new Date().setMonth(new Date().getMonth() + 1))
      },
    });

    await prisma.user.update({
      where: { id: updatedOrder.userId },
      data: { isPremium: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification failed:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}