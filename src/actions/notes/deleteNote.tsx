"use server";
import { getSessionOrThrow } from "../../../lib/getSession";
import prisma from "../../../lib/prisma";
import { isOwner } from "./isOwner";
export const deleteNote = async (noteId: string) => {
  try {
    const session = await getSessionOrThrow();
    if (!session) {
      return {
        message: "You are not authorized to perform this action",
        success: false,
      };
    }
    //Checking the owner 
    const owner = await isOwner(noteId);
    if (!owner) {
      return {
        message: "You are not authorized to perform this action",
        success: false,
      };
    }
    const note = await prisma.voiceNote.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new Error("Note not found");
    }
    await prisma.comment.deleteMany({
      where: {
        voiceNoteId: noteId,
      },
    });
    //Deleting the likes and Comments associated with it
    await prisma.like.deleteMany({
      where: {
        voiceNoteId: noteId,
      },
    });

    await prisma.voiceNote.delete({
      where: {
        id: noteId,
      },
    });
    return { message: "Voice note deleted successfully", success: true };
  } catch (error) {
    
    throw new Error("Failed to delete note");
  }
};
