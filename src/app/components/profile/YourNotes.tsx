import React, { useEffect, useState } from "react";
import { yourUserNotes } from "@/actions/notes/yourUserNotes";
import Link from "next/link";
import { Loader2, Music, Calendar, Tag, Globe2, Filter } from "lucide-react";
import { Language } from "@/types/Languages";
import { Category } from "@/types/Categories";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setNotes([]); // Clear existing notes when loading starts
        const fetchedNotes = await yourUserNotes(selectedCategory as Category, selectedLanguage as Language);
        //@ts-ignore
        setNotes(fetchedNotes.voiceNotes || []);
      } catch (error) {
        setError("Could not fetch user notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedCategory, selectedLanguage]);

  const handlePlayPause = (noteId: string) => {
    setCurrentlyPlaying(currentlyPlaying === noteId ? null : noteId);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent rounded-lg" />

      <div className="relative text-white container mx-auto mt-6 p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Music className="w-8 h-8 text-indigo-400" />
          <h2
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(to right, #9f7aea, #4299e1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Your Voice Notes
          </h2>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white/5 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-100">Filters</h3>
          </div>
          
          <div className="flex flex-wrap gap-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <label 
                htmlFor="category" 
                className="block text-sm font-medium text-indigo-200 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/10 text-indigo-100 rounded-lg px-3 py-2 
                         border border-white/20 outline-none transition-all duration-200
                         hover:border-indigo-400/50 focus:border-indigo-400
                         focus:ring-2 focus:ring-indigo-400/20
                         [&>option]:bg-slate-900 [&>option]:text-indigo-100"
                style={{
                  backgroundColor: 'rgb(15 23 42)'
                }}
              >
                <option value="">All Categories</option>
                {Object.values(Category).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex-1 min-w-[200px]">
              <label 
                htmlFor="language" 
                className="block text-sm font-medium text-indigo-200 mb-2"
              >
                Language
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-white/10 text-indigo-100 rounded-lg px-3 py-2 
                         border border-white/20 outline-none transition-all duration-200
                         hover:border-indigo-400/50 focus:border-indigo-400
                         focus:ring-2 focus:ring-indigo-400/20
                         [&>option]:bg-slate-900 [&>option]:text-indigo-100"
                style={{
                  backgroundColor: 'rgb(15 23 42)'
                }}
              >
                <option value="">All Languages</option>
                {Object.values(Language).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Section - Only show one of loading, error, or notes */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-center">{error}</p>
          </div>
        ) : notes.length === 0 ? (
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
                        background: "linear-gradient(to right, #9f7aea, #4299e1)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourNotes;