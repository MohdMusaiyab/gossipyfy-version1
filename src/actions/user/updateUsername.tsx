"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const updateUserName = async (newUsername: string) => {
  try {
    // Get the session, and handle authentication failure in getSessionOrThrow
    const session = await getSessionOrThrow();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const id = session.user.id;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.id !== id) {
      throw new Error("Not authenticated to update the username");
    }

    const existingUserWithNewUsername = await prisma.user.findUnique({
      where: {
        username: newUsername,
      },
    });
    if (existingUserWithNewUsername) {
      throw new Error("Username already taken");
    }
    //If User is Guest User
    if (existingUser.email === "guestemail@gmail.com") {
      throw new Error("Guest User cannot update username");
    }
    //Updating the username
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: newUsername,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Could not update username");
  }
};
