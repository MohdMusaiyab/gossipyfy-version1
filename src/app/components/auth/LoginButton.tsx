"use client"; // This is a client-side component

import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginBtn() {
  const { data: session } = useSession();

  const handleLogin = async () => {
    try {
      await signIn(); // Redirect to the default NextAuth login page
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Sign the user out
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {session ? (
        <>
          {/* Display the username */}
          <Link href="/profile" className="text-purple-300 hover:text-purple-400 transition-colors">
            {session.user?.username || session.user?.email} {/* Fallback to email if username is not available */}
          </Link>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 bg-purple-600 text-gray-100 rounded hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </>
      ) : (
        <motion.button
          onClick={handleLogin}
          className="px-4 py-2 bg-purple-500 text-gray-100 rounded hover:bg-purple-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      )}
    </div>
  );
}
