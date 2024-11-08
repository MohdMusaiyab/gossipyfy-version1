"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getSubscriptionDate = async () => {
  try {
    const session = await getSessionOrThrow();
   
    const latestPaidOrder = await prisma.order.findFirst({
        where: {
          userId: session?.user?.id,  // Replace with the user's ID
          status: 'paid',          // Only paid orders
        },
        orderBy: {
          createdAt: 'desc',       // Sort by createdAt in descending order to get the latest one
        },
      });
    if (!latestPaidOrder) {
        throw new Error("No paid orders found");
        
    }
    return latestPaidOrder.subscriptionExpiry?.toISOString();
  } catch (error) {
    console.log(error);
  }
};
