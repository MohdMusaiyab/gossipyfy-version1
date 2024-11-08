import React from 'react';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Left: Copyright Section */}
        <div className="text-center md:text-left">
          <span className="text-lg">&copy; {new Date().getFullYear()} Talkies. All rights reserved.</span>
        </div>
        
        {/* Center: Navigation Links */}
        <nav className="flex space-x-6 text-sm md:text-base">
          <a href="/" className="hover:text-purple-400 transition duration-200">Home</a>
          <a href="/explore" className="hover:text-purple-400 transition duration-200">Explore</a>
          <a href="/contact" className="hover:text-purple-400 transition duration-200">Contact Us</a>
          <a href="/guidelines" className="hover:text-purple-400 transition duration-200">Guidelines</a>
          <a href="/privacy-policy" className="hover:text-purple-400 transition duration-200">Privacy Policy</a>
        </nav>
        
        {/* Right: Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-200">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-200">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-200">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition duration-200">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
