"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";

export const updateEmail = async (newEmail: string) => {
  try {
    //Get the session, and handle authentication failure in getSessionOrThrow
    const session = await getSessionOrThrow();
    
    const id=session?.user?.id;
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("existingUser", existingUser?.email);
    // @ts-ignore
    console.log("from session ",session.user.email);
    if (!existingUser) {
      throw new Error("User not found");
    }
    if (existingUser.id !== id) {
      throw new Error("Not authenticated to update the email");
    }
    //Checking if the new email is already taken
    const existingUserWithNewEmail = await prisma.user.findUnique({
      where: {
        email: newEmail,
      },
    });
    if (existingUserWithNewEmail) {
      throw new Error("Email already in Use");
    }
    //Updating the email
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: newEmail,
      },
    });
    console.log("updatedUser at the end", updatedUser.email);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Could not update email");
  }
};
