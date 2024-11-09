"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getPremiumStatus = async () => {
  const session = await getSessionOrThrow();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: session.user.id,
    },
  });

  return user?.isPremium || false;
};
