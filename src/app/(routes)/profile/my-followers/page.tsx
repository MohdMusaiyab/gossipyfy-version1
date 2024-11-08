"use client";

import React, { useEffect, useState } from 'react';
import { getMyFollowers } from '@/actions/user/getMyFollowers';
import { removeFollower } from '@/actions/user/removeFollower';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, UserMinus, Users, User } from 'lucide-react';

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const result = await getMyFollowers();
        setFollowers(result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError('Failed to fetch followers');
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  const handleRemoveFollower = async (followerId: string) => {
    setProcessingId(followerId);
    try {
      await removeFollower(followerId);
      
      // Show notification
      const notification = document.getElementById('notification');
      notification.textContent = 'Follower removed successfully';
      notification.classList.remove('translate-y-[-100%]');
      setTimeout(() => {
        notification.classList.add('translate-y-[-100%]');
      }, 3000);
      
      // Update followers list
      setFollowers(followers.filter((follower) => follower.id !== followerId));
    } catch (err) {
      console.error('Error removing follower:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const navigateToProfile = (id: string) => {
    router.push(`/profile/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <div className="text-center space-y-4">
          <UserMinus className="w-12 h-12 text-red-400 mx-auto" />
          <p className="text-xl text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090919] to-[#161837] py-12 px-4">
      {/* Success Notification */}
      <div 
        id="notification" 
        className="fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-[-100%] transition-transform duration-300 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-b-lg shadow-lg"
      />

      <div className="max-w-3xl mx-auto">
        <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-radial from-indigo-500/10 to-transparent rounded-2xl" />
          
          <div className="flex items-center space-x-3 mb-8">
            <Users className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white ">
              My Followers
            </h1>
          </div>

          {followers.length > 0 ? (
            <div className="space-y-4">
              {followers.map((follower) => (
                <div 
                  key={follower.id}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => navigateToProfile(follower.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-white group-hover:text-indigo-300 transition-colors duration-200">
                          {follower.username}
                        </h2>
                        <Link 
                          href={`/profile/${follower.id}`}
                          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2
                        ${processingId === follower.id
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/25'
                        }`}
                      onClick={() => handleRemoveFollower(follower.id)}
                      disabled={processingId === follower.id}
                    >
                      {processingId === follower.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-white">Processing...</span>
                        </>
                      ) : (
                        <>
                          <UserMinus className="w-4 h-4 text-white" />
                          <span className="text-white">Remove Follower</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-indigo-400/50 mx-auto mb-4" />
              <p className="text-xl text-indigo-200">You have no followers yet.</p>
              <p className="text-indigo-400 mt-2">Keep sharing content to attract followers!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersPage;