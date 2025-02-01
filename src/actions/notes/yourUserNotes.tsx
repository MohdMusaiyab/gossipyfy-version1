"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";
import { Language } from "@/types/Languages";
import { Category } from "@/types/Categories";

export const yourUserNotes = async (
  category?: Category, // Using Category enum type
  language?: Language // Using Language enum type
) => {
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
        voiceNotes: {
          where: {
            ...(category ? { category } : {}), // Filter by category if provided
            ...(language ? { language } : {}), // Filter by language if provided
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Could not get user voice notes");
  }
};
