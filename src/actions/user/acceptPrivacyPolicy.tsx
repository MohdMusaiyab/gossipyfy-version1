"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const acceptPrivacyPolicy = async () => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Session not found");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isPrivacyPolicyAccepted: true,
      },
    });
    return { success: true, message: "Privacy policy accepted successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to accept privacy policy");
  }
};
