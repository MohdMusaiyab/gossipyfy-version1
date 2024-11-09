"use client"; // Necessary to handle client-side rendering of the error page

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error); // Log the error for debugging
  }, [error]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #090919, #161837)",
        color: "#fff",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-4"
      >
        Something went wrong
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg mb-6 text-purple-200/80"
      >
        An error occurred on the server.
      </motion.p>

      <div className="flex gap-6">
        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group px-8 py-4 rounded-full relative overflow-hidden mb-4"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all"></span>
          <span className="relative text-white font-semibold">Try again</span>
        </motion.button>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border border-purple-400/50 hover:bg-purple-400/10 text-purple-400 font-semibold transition-all"
          >
            Go back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
