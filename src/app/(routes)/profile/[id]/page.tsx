"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUser } from "@/actions/user/getUser";
import { toggleFollowers } from "@/actions/notes/toggleFollowers";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Users, Mic, Loader2 } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          //@ts-ignore
          const userData = await getUser(id);
          setUser(userData);
          const currentUser = session?.user;
          const isUserFollowing = userData.followers.some(
            (follower) => follower.id === currentUser?.id
          );
          setIsFollowing(isUserFollowing);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Could not load user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id, session?.user?.id]);

  const handleToggleFollow = async () => {
    if (!session) {
      setError("Please login to follow/unfollow this user.");
      return;
    }

    setToggleLoading(true);
    try {
      setIsFollowing((prev) => !prev);
      setUser((prev) => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.slice(0, -1)
          : [...prev.followers, { id: session.user.id }],
      }));
      //@ts-ignore
      await toggleFollowers(id);
    } catch (err) {
      console.error("Error toggling follow status", err);
      setError("Failed to update follow status.");
      setIsFollowing((prev) => !prev);
    } finally {
      setToggleLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <div className="text-white bg-opacity-20 bg-purple-500 rounded-lg p-4">
          {error}
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <div className="text-white">No user data found</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] text-white">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Profile Header */}
        <div className="relative bg-opacity-10 bg-purple-500 rounded-xl p-6 mb-8 backdrop-blur-lg shadow-lg shadow-purple-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl" />
          <div className="relative">
            <h1
              className="text-3xl font-bold"
              style={{
                background:
                  "linear-gradient(to right, #a855f7, #667eea, #4299e1)", // matches purple-400 to blue-400
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {`${user.username}'s Profile`}
            </h1>
          </div>
        </div>

        {/* Follow Section */}
        <div className="bg-opacity-10 bg-purple-500 rounded-xl p-6 mb-8 backdrop-blur-lg relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggleFollow}
                disabled={toggleLoading}
                className={`relative px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                  ${
                    isFollowing
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  }`}
              >
                {toggleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Users className="w-4 h-4" />
                )}
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-indigo-100">
                  {user.followers.length} Followers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Notes Section */}
        <div className="bg-opacity-10 bg-purple-500 rounded-xl p-6 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Mic className="w-6 h-6 text-purple-400" />
            Voice Notes
          </h2>

          {user.voiceNotes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {user.voiceNotes.map((note) => (
                <Link
                  href={`/explore/${note.id}`}
                  key={note.id}
                  className="block bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-4 hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-200 border border-purple-500/20 hover:border-purple-500/40"
                >
                  <h3 className="font-medium text-lg text-indigo-100">
                    {note.title}
                  </h3>
                  {note.createdAt && (
                    <p className="text-sm text-indigo-200 mt-2">
                      Created: {new Date(note.createdAt).toLocaleString()}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-indigo-200">No voice notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
