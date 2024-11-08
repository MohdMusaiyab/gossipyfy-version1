"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { myFollowingNotes } from "@/actions/notes/myFollowingnotes";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userId = "your-user-id-here";
        const fetchedNotes = await myFollowingNotes();
        // @ts-ignore
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        // @ts-ignore
        setError("Failed to fetch notes");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#090919] to-[#161837]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-purple-200/80 text-lg">Loading your notes...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#090919] to-[#161837]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-red-400 bg-red-900/20 px-6 py-4 rounded-lg backdrop-blur-sm"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r  blur-3xl pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12  text-transparent"
          variants={itemVariants}
          style={{
            background: "linear-gradient(to right, #9f7aea, #667eea, #4299e1)", // purple to indigo to blue
            backgroundClip: "text",
            WebkitBackgroundClip: "text", // for cross-browser support
          }}
        >
          Notes from My Subscriptions
        </motion.h1>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              // @ts-ignore
              <motion.div key={note.id} variants={itemVariants}>
                {/* @ts-ignore */}
                <Link href={`/explore/${note.id}`}>
                  <div className="group h-full rounded-xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                        {/* @ts-ignore */}
                        {note.title}
                      </h2>
                      {/* @ts-ignore */}
                      {note?.user?.username && (
                        <p className="text-purple-200/60 text-sm mt-2">
                          {/* @ts-ignore */}
                          Created by: {note.user.username}
                        </p>
                      )}

                      <div className="space-y-4 mt-4">
                        {/* @ts-ignore */}

                        {note.description && (
                          <p className="text-purple-200/80 text-sm line-clamp-3">
                            {/* @ts-ignore */}

                            {note.description}
                          </p>
                        )}
                        {/* @ts-ignore */}

                        {note.fileUrl && (
                          <div className="relative p-2 bg-purple-900/20 rounded-lg backdrop-blur-sm mt-4">
                            <audio
                              controls
                              // @ts-ignore
                              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${note.fileUrl}`}
                              className="w-full [&::-webkit-media-controls-panel]:bg-purple-900/40 [&::-webkit-media-controls-play-button]:text-purple-400 [&::-webkit-media-controls-current-time-display]:text-purple-200 [&::-webkit-media-controls-time-remaining-display]:text-purple-200 [&::-webkit-media-controls-timeline]:text-purple-400 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 py-12"
          >
            <div className="text-center">
              <p className="text-purple-200/80 text-xl">No notes found.</p>
              <p className="text-purple-200/60 text-sm mt-2">
                Start following creators to see their notes here.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NotesPage;
