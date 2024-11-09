"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const yourUserNotes = async () => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        voiceNotes: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Could not get user");
  }
};
