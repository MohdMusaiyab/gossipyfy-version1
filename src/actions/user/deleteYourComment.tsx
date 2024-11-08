"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";

export const deleteYourComment = async (commentId: number) => {
  try {
    const session = await getSessionOrThrow();
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (comment.userId !== session?.user?.id) {
      throw new Error("You can only delete your own comments");
    }
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return {
      message: "Comment deleted successfully",
      success: true,
      commentId,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while deleting the comment",
      success: false,
    };
  }
};
