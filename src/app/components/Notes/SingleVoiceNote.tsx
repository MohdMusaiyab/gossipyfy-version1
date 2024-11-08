"use client";
import React, { useEffect, useState } from "react";
import { singleNote } from "@/actions/notes/singleNote";
import { addComment } from "@/actions/notes/addComment";
import { deleteYourComment } from "@/actions/user/deleteYourComment";
import { toggleLike } from "@/actions/notes/toggleLike";
import { toggleFollowers } from "@/actions/notes/toggleFollowers";
import { useSession } from "next-auth/react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";

const SingleVoiceNote = ({ noteId }) => {
  const { data: session } = useSession();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState({ loading: false, error: null });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await singleNote(noteId);
        setNote(fetchedNote);
        setComments(fetchedNote.comments);
        setLikeCount(fetchedNote.likes.length || 0);
        setHasLiked(
          fetchedNote.likes.some((like) => like.userId === session?.user?.id)
        );
        setIsFollowing(fetchedNote.isFollowing);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, session?.user?.id]);

  const handleToggleLike = async () => {
    try {
      if (!session) {
        setError("Please login to like this note");
        return;
      }
      setHasLiked((prev) => !prev);
      setLikeCount((prev) => (hasLiked ? prev - 1 : prev + 1));
      await toggleLike(noteId);
    } catch (err) {
      console.error("Error toggling like", err);
      setError(err.message);
      setHasLiked((prev) => !prev);
      setLikeCount((prev) => (hasLiked ? prev + 1 : prev - 1));
    }
  };

  const handleToggleFollow = async () => {
    try {
      if (!session) {
        setError("Please login to follow this user");
        return;
      }
      setIsFollowing((prev) => !prev);
      setNote((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          followers: isFollowing
            ? prev.user.followers.slice(0, -1)
            : [...prev.user.followers, session.user.id],
          following: prev.user.following,
        },
      }));
      await toggleFollowers(note.user.id);
    } catch (err) {
      console.error("Error toggling follow status", err);
      setError(err.message);
      setIsFollowing((prev) => !prev);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = session.user.id;
      const addedComment = await addComment(noteId, newComment, userId);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setDeleteStatus({ loading: true, error: null });
      const result = await deleteYourComment(commentId);
      
      if (result.success) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        setDeleteStatus({ loading: false, error: result.message });
      }
    } catch (err) {
      setDeleteStatus({ loading: false, error: "Failed to delete comment" });
    } finally {
      setDeleteStatus({ loading: false, error: null });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <div className="text-red-400 bg-red-900/20 px-6 py-3 rounded-lg shadow-lg backdrop-blur-xl border border-red-500/20">
          {error}
        </div>
      </div>
    );

  if (!note)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <div className="text-white bg-purple-500/10 px-6 py-3 rounded-lg shadow-lg backdrop-blur-xl">
          Note not found
        </div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-purple-500/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/10">
          {/* Header Section */}
          <div className="space-y-6 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {note.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/profile/${note.user.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 rounded-full transition-all duration-300 text-white group"
              >
                <AiOutlineUser className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{note.user.username}</span>
              </Link>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleFollow}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium
                  ${
                    isFollowing
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  } text-white shadow-lg`}
              >
                {isFollowing ? "Following" : "Follow"}
              </motion.button>

              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span>{note.user.followers.length} Followers</span>
                <span>{note.user.following.length} Following</span>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{note.description}</p>
          </div>

          {/* Audio Player */}
          <div className="mb-10 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20 shadow-lg">
            <audio
              controls
              className="w-full"
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${note.fileUrl}`}
            >
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Language", value: note.language },
              { label: "Type", value: note.isPremium ? "Premium" : "Free" },
              { label: "Category", value: note.category },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-5 rounded-xl border border-purple-500/20 shadow-lg"
              >
                <span className="text-purple-300 block mb-1 text-sm">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleLike}
            className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 px-5 py-2.5 rounded-full transition-all duration-300 mb-10"
          >
            {hasLiked ? (
              <AiFillHeart className="text-red-500 w-6 h-6" />
            ) : (
              <AiOutlineHeart className="text-gray-300 w-6 h-6" />
            )}
            <span className="text-white font-medium">{likeCount} likes</span>
          </motion.button>

          {/* Comments Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-purple-500/20 pb-4">
              <AiOutlineMessage size={24} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Comments</h2>
            </div>

            <div className="space-y-4">
              {deleteStatus.error && (
                <div className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg mb-4">
                  {deleteStatus.error}
                </div>
              )}
              
              {comments.map((comment) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={comment.id}
                  className="bg-purple-500/5 rounded-xl p-5 border border-purple-500/10 shadow-lg relative group"
                >
                  <p className="text-white leading-relaxed pr-16">{comment.text}</p>
                  {comment.user.username === session?.user?.username && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deleteStatus.loading}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-5 py-4 bg-purple-500/10 text-white rounded-xl border border-purple-500/20 focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 placeholder-gray-400"
                placeholder="Share your thoughts..."
                required
              ></textarea>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-lg transition-all duration-300"
              >
                Post Comment
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleVoiceNote;