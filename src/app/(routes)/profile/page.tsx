"use client";
import { getUser } from "@/actions/user/getUser";
import UpdateUsernameForm from "../../components/profile/UpdateUsernameForm";
import UpdateUserEmailForm from "../../components/profile/UpdateUserEmailForm";
import UpdateUserPasswordForm from "../../components/profile/UpdateUserPasswordForm";
import YourNotes from "../../components/profile/YourNotes";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PremiumStatus from "@/app/components/General/PremiumStatus";
import UpgradeToPremium from "@/app/components/General/UpgradeToPremium";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const userId = session.user.id;
        const fetchedUser = await getUser(userId);
        //@ts-ignore
        setUser(fetchedUser);
      }
      setLoading(false);
    };

    fetchUser();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <div className="text-center space-y-4">
          <p className="text-xl text-red-400">
            Please log in to see this page.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white shadow-lg shadow-purple-500/25 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <p className="text-xl text-gray-400">No user data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090919] to-[#161837] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-radial from-indigo-500/10 to-transparent rounded-2xl" />

          <h1
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{
              background:
                "linear-gradient(to right, #a855f7, #667eea, #4299e1)", // Matches from-purple-400 to blue-400
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Profile Page
          </h1>

          {/* User Info Section */}
          <div className="space-y-6 mb-12 text-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-sm text-indigo-200">Username</p>
                <p className="text-lg font-semibold flex items-center">
                  
                  {user.username}{" "}
                  {user.isPremium ? <PremiumStatus /> : <UpgradeToPremium />}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-sm text-indigo-200">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/profile/my-followers"
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-400/20 transition-all duration-200"
              >
                <span className="text-purple-400">
                  Followers ({user.followers.length})
                </span>
              </Link>
              <Link
                href="/profile/my-followings"
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-400/20 transition-all duration-200"
              >
                <span className="text-purple-400">
                  Following ({user.following.length})
                </span>
              </Link>
            </div>
          </div>

          {/* Update Forms Section */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl">
              <UpdateUsernameForm currentUsername={user.username} />
            </div>

            <div className="p-6 rounded-xl ">
              <UpdateUserEmailForm currentEmail={user.email} />
            </div>
            <div className="p-6 rounded-xl">
              <UpdateUserPasswordForm />
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-12 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <YourNotes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
