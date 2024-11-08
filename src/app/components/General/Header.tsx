"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoginBtn from "../auth/LoginButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`
        sticky top-0 flex items-center justify-between p-4 transition-all duration-300
        ${
          hasScrolled
            ? "backdrop-blur-md bg-[#090919]/70 shadow-lg"
            : "bg-gradient-to-r from-[#090919] to-[#161837]"
        }
      `}
      style={{
        zIndex: 1000,
      }}
    >
      {/* Logo and Name */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/images/Gossipify-Logo.svg"
          alt="Logo"
          width={120}
          height={100}
          
        />
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-white">
        <Link href="/" className="hover:text-purple-300 transition-colors">
          Home
        </Link>
        <Link
          href="/explore"
          className="hover:text-purple-300 transition-colors"
        >
          Explore
        </Link>
      </nav>

      {/* Login Button */}
      <div className="flex space-x-4">
        <LoginBtn />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button className="focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: hasScrolled
                ? "rgba(9, 9, 25, 0.8)"
                : "linear-gradient(135deg, #090919, #161837)",
              backdropFilter: hasScrolled ? "blur(8px)" : "none",
            }}
          >
            <nav className="flex flex-col space-y-2 p-4">
              <Link
                href="/"
                className="text-white hover:text-purple-300 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-white hover:text-purple-300 transition-colors"
                onClick={toggleMenu}
              >
                Explore
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
