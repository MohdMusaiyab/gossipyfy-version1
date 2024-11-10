"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getPrivacyPolicyStatus = async () => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        isPrivacyPolicyAccepted: true,
      },
    });
    if (!user) {
      return null
    }

    return user.isPrivacyPolicyAccepted;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get privacy policy status");
  }
};
