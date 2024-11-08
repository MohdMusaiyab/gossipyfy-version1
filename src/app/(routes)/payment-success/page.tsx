"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSubscriptionDate } from "@/actions/user/getSubscriptionDate";
import { getPremiumStatus } from "@/actions/user/getPremiumStatus";
import { Crown } from "lucide-react";

const Page = () => {
  const { data: session, update } = useSession();
  const [subscriptionExpiry, setSubscriptionExpiry] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSubscriptionDate = async () => {
      try {
        if (session?.user?.id) {
          const expiryDate = await getSubscriptionDate();
          // @ts-ignore
          setSubscriptionExpiry(expiryDate);
        }
      } catch (error) {
        console.error("Error fetching subscription date:", error);
      }
    };

    const getStatus = async () => {
      try {
        const premiumStatus = await getPremiumStatus();
        if (premiumStatus !== isPremium) {
          setIsPremium(premiumStatus);
          
          if (session?.user) {
            await update({
              ...session,
              user: {
                ...session.user,
                isPremium: premiumStatus,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching premium status:", error);
      }
    };

    if (session?.user?.id) {
      fetchSubscriptionDate();
      getStatus();
    }
  }, [session, update, isPremium]);

  // Helper function to format date
  const formatDate = (dateString: string | null) => {
    return dateString 
      ? new Date(dateString).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) 
      : "Not Available";
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] 
                 flex items-center justify-center p-4"
    >
      <div 
        className="bg-[#1E2133] rounded-2xl shadow-2xl p-8 w-full max-w-md 
                   border border-[#9F7AEA]/20 backdrop-blur-md"
      >
        <div className="text-center mb-6">
          <h1 
            className="text-3xl font-bold text-white mb-2 
                       "
          >
            {session?.user?.name ? `${session.user.name}'s` : "Your"} Subscription
          </h1>
          <p className="text-[#A0AEC0] text-sm">
            {session?.user?.email || "User Details"}
          </p>
        </div>

        {session?.user?.id ? (
          <div className="space-y-4">
            <div 
              className="bg-[#2D3748]/30 p-4 rounded-lg 
                         border border-[#4299E1]/20"
            >
              <div className="flex justify-between items-center">
                <span className="text-[#A0AEC0]">Subscription Expiry</span>
                <span className="text-white font-semibold">
                  {formatDate(subscriptionExpiry)}
                </span>
              </div>
            </div>

            <div 
              className={`p-4 rounded-lg text-center transition-all duration-300 
                         ${isPremium 
                           ? 'bg-[#6B46C1]/20 border-[#6B46C1]/40' 
                           : 'bg-[#718096]/20 border-[#718096]/40'} 
                         border`}
            >
              {isPremium ? (
                <div className="flex items-center justify-center text-[#9F7AEA]">
                  <Crown className="mr-2 w-6 h-6" />
                  <p className="text-white font-bold">
                    Premium User 🎉
                  </p>
                </div>
              ) : (
                <p className="text-[#A0AEC0]">
                  Not a Premium User
                </p>
              )}
            </div>

            {!isPremium && (
              <button 
                className="w-full py-3 rounded-lg 
                           bg-gradient-to-r from-[#6B46C1] to-[#4299E1] 
                           hover:from-[#805AD5] hover:to-[#2B6CB0] 
                           text-white font-bold transition-all duration-300 
                           transform hover:scale-105"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        ) : (
          <div 
            className="text-center text-[#A0AEC0] 
                       animate-pulse"
          >
            Loading user session...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;