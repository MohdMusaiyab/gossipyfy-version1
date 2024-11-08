"use client";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Link from "next/link";
import SearchBar from "@/app/components/Filters/SearchBar";

const ExplorePage = () => {
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleLanguageChange = (selectedLanguages: string[]) => {
    setLanguageFilters(selectedLanguages);
    setPage(1);
    setNotes([]);
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setCategoryFilters(selectedCategories);
    setPage(1);
    setNotes([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setNotes([]);
  };

  const fetchNotes = async (page: number) => {
    if (!loading) {
      setLoading(true);
      setError(null);
      try {
        // Create base query parameters
        const params: Record<string, string> = {
          page: String(page),
          limit: String(limit),
        };

        // Only add non-empty filters
        if (languageFilters.length > 0) {
          params.languages = languageFilters.join(",");
        }
        if (categoryFilters.length > 0) {
          params.categories = categoryFilters.join(",");
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const queryParams = new URLSearchParams(params);
        const response = await fetch(`/api/note/filters?${queryParams}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && Array.isArray(data.notes)) {
          setNotes((prevNotes) => {
            if (page === 1) return data.notes;
            const newNotes = data.notes.filter(
              (newNote) => !prevNotes.some((prevNote) => prevNote.id === newNote.id)
            );
            return [...prevNotes, ...newNotes];
          });
          setHasMore(data.notes.length === limit);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch notes");
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScroll = () => {
    const threshold = 100;
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    setNotes([]);
    fetchNotes(1);
  }, [languageFilters, categoryFilters, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchNotes(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="flex bg-gradient-to-br from-[#090919] to-[#161837] min-h-screen">
      <SideBar
        selectedLanguages={languageFilters}
        onLanguageChange={handleLanguageChange}
        selectedCategories={categoryFilters}
        onCategoryChange={handleCategoryChange}
      />

      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Link
              href={`explore/${note.id}`}
              key={note.id}
              className="bg-[#1e1e2f] rounded-lg shadow-lg p-2 transition-all duration-200 hover:scale-105 hover:shadow-xl "
            >
              <div className="flex flex-col h-full ">
                <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {note.title}
                </h2>
                {note?.user?.username && (
                  <span className="text-gray-400 text-sm mb-2">
                    {note.user.username}
                  </span>
                )}
                {note.description && (
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {note.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-300">Loading more notes...</p>
          </div>
        )}

        {!hasMore && notes.length > 0 && (
          <p className="text-center text-gray-400 mt-4">
            No more notes available.
          </p>
        )}

        {!loading && notes.length === 0 && !error && (
          <div className="text-center py-8">
            <p className="text-gray-300">No notes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;

interface VoiceNote {
  id: string;
  title: string;
  description?: string;
  user?: {
    username: string;
  };
}