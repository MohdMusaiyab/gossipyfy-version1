"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const getMyFollowers = async () => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const followers = await prisma.user.findMany({
      where: {
        following: {
          some: {
            // @ts-ignore
            id: session.user.id, // The logged-in user's ID should be in the "following" list of other users
          },
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return followers;
  } catch (err) {
    throw new Error("Error in getMyFollowers");
  }
};
