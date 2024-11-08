"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type HeroProps = {
  scrollToAbout: () => void; 
};

const Hero: React.FC<HeroProps> = ({ scrollToAbout }) => {
  return (
    <section
      className="relative flex items-center justify-between min-h-screen"
      style={{
        background: "linear-gradient(135deg, #090919, #161837)",
        color: "#fff",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-12 max-w-7xl mx-auto space-y-10 md:space-y-0">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-start md:w-1/2 space-y-8"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="block">Where Stories</span>
            <span
  className="text-transparent"
  style={{
    background: "linear-gradient(to right, #9f7aea, #4c51bf, #4299e1)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text", // for better cross-browser support
  }}
>
  Turn into Earnings
</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-xl md:text-2xl text-purple-200/80 leading-relaxed"
          >
            Your Voice. Your Story. Your Earnings. Share audio that
            matters—gossip, music, podcasts, and more—all while staying
            anonymous. Get heard, get paid.
          </motion.p>

          <div className="flex gap-6">
            <Link href="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all"></span>
                <span className="relative text-white font-semibold">
                  Start Your Journey
                </span>
              </motion.button>
            </Link>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                scrollToAbout();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-purple-400/50 hover:bg-purple-400/10 text-purple-400 font-semibold transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="md:w-1/2 w-full flex justify-center"
        >
          <Image
            src="/images/Hero Image.svg"
            alt="Hero Image"
            width={500} // Adjust the width as needed
            height={500} // Adjust the height as needed
            className="object-contain mb-10" // Ensures the image scales correctly
            
          />
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
