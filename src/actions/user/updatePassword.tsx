"use server";
import prisma from "../../../lib/prisma";
import { getSessionOrThrow } from "../../../lib/getSession";
import bcrypt from "bcryptjs";

export const updatePassword = async (newPassword: string) => {
  // Get the session, and handle authentication failure in getSessionOrThrow
  const session = await getSessionOrThrow();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const currentUserId = session.user.id;
  //Finding if the user thats making the request is the same as the user that is being updated
  const existingUser = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });
  if (!existingUser) {
    throw new Error("User not found");
  }
  if (existingUser.id !== currentUserId) {
    throw new Error("Not authenticated to update the password");
  }
  //Not Allowing Guest User to Update Password
  if (existingUser.email === "guestemail@gmail.com") {
    throw new Error("Guest User cannot update password");
  }
  //Updating the password
  //Need to update it the same way at the time of sign up
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      password: hashedPassword,
    },
  });

  return updatedUser;
};
