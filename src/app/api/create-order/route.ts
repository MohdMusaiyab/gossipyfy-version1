import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Razorpay from 'razorpay';
import prisma from '../../../../lib/prisma';
import { getSessionOrThrow } from '../../../../lib/getSession'


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const createOrderSchema = z.object({
  amount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = createOrderSchema.parse(body);

    const session = await getSessionOrThrow();
    const userId = session.user.id;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = await prisma.order.create({
      data: {
        userId,
        razorpayOrderId: order.id,
        // @ts-ignore
        amount: parseInt(order.amount),
        currency: order.currency,
        status: 'pending',
      },
    });

    return NextResponse.json({
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      newOrder,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}