"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";
import { isOwner } from "./isOwner";

export const deleteComments = async (noteId: string, commentId: number) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      return {
        message: "You need to be authenticated to perform this action",
        success: false,
      };
    }
    else {
      const isOwnerOfNote = await isOwner(noteId);
      if (!isOwnerOfNote) {
        return {
          message: "You are not authorized to perform this action",
          success: false,
        };
      }
      //Now delete the comment
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return {
        message: "Comment deleted successfully",
        success: true,
      };
    }
  } catch (error) {
    return {
      message: "Error in deleting comment",
      success: false,
    };
  }
};
