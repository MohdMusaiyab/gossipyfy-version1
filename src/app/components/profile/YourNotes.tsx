"use client";
import React, { useEffect, useState } from "react";
import { yourUserNotes } from "@/actions/notes/yourUserNotes";
import Link from "next/link";
import { Loader2, Music, Volume2, Calendar, Tag, Globe2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  createdAt: string;
  fileUrl: string;
}

const YourNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await yourUserNotes();
        setNotes(fetchedNotes.voiceNotes || []);
      } catch (error) {
        setError("Could not fetch user notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handlePlayPause = (noteId: string) => {
    setCurrentlyPlaying(currentlyPlaying === noteId ? null : noteId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg backdrop-blur-sm">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent rounded-lg" />

      <div className="relative text-white container mx-auto mt-6 p-4">
        <div className="flex items-center gap-3 mb-8">
          <Music className="w-8 h-8 text-indigo-400" />
          <h2
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(to right, #9f7aea, #4299e1)", // same gradient as from-purple-400 to blue-400
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Your Voice Notes
          </h2>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center backdrop-blur-sm">
            <Music className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <p className="text-indigo-100">
              No voice notes found. Start recording to create your first note!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group relative bg-white/5 border border-white/10 rounded-lg 
                         hover:bg-white/10 transition-all duration-300 backdrop-blur-sm
                         hover:shadow-lg hover:shadow-purple-500/10"
              >
                <Link href={`profile/my-note/${note.id}`}>
                  <div className="p-6">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{
                        background:
                          "linear-gradient(to right, #9f7aea, #4299e1)", // same gradient from purple-400 to blue-400
                        WebkitBackgroundClip: "text", // Ensures it works on Safari and Chrome
                        backgroundClip: "text", // Ensures it works on modern browsers
                        color: "transparent", // Makes the text color transparent to show the gradient
                      }}
                    >
                      {note.title}
                    </h3>

                    <p className="text-indigo-100/70 mb-4 line-clamp-2">
                      {note.description || "No description available"}
                    </p>

                    <div className="space-y-2 text-sm text-indigo-100">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-indigo-400" />
                        <span>{note.language}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-400" />
                        <span>{note.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span>
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="p-4 border-t border-white/10">
                  <audio
                    controls
                    className="w-full [&::-webkit-media-controls-panel]:bg-indigo-950/50
                             [&::-webkit-media-controls-current-time-display]:text-indigo-100
                             [&::-webkit-media-controls-time-remaining-display]:text-indigo-100"
                    onPlay={() => handlePlayPause(note.id)}
                  >
                    <source
                      src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${note.fileUrl}`}
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Hover effect overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              pointer-events-none rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourNotes;
