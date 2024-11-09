"use client";

import React, { useState } from "react";
import { Mail, User, MessageCircle, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement actual form submission logic
    try {
      // Example submission (replace with your actual form submission method)

      alert("This is currently under development. Please try again later.");

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] 
                 flex items-center justify-center p-4 overflow-hidden"
    >
      <div
        className="bg-[#1E2133] rounded-2xl shadow-2xl p-8 w-full max-w-md 
                   border border-[#9F7AEA]/20 backdrop-blur-md 
                   relative overflow-hidden"
      >
        {/* Decorative gradient background elements */}
        <div
          className="absolute top-0 right-0 w-72 h-72 
                     bg-gradient-to-br from-[#9F7AEA]/20 to-[#4299E1]/20 
                     rounded-full -translate-x-1/2 -translate-y-1/2 
                     opacity-30 blur-3xl"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 
                     bg-gradient-to-br from-[#4299E1]/20 to-[#9F7AEA]/20 
                     rounded-full translate-x-1/2 translate-y-1/2 
                     opacity-30 blur-3xl"
        />

        <div className="relative z-10">
          <h1
            style={{
              background: "linear-gradient(to right, #9F7AEA, #4299E1)", // same gradient as Tailwind
              backgroundClip: "text", // clips gradient to text
              WebkitBackgroundClip: "text", // adds Safari compatibility
              color: "transparent", // makes text transparent to show gradient
            }}
            className="text-3xl font-bold text-center mb-6"
          >
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Message Textarea */}
            <div className="relative">
              <div
                className="absolute top-3 left-0 pl-3 
                           pointer-events-none text-[#A0AEC0]"
              >
                <MessageCircle className="w-5 h-5" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full py-3 pl-10 pr-4 
                           bg-[#2D3748]/30 border border-[#4299E1]/20 
                           rounded-lg text-white 
                           focus:outline-none focus:ring-2 
                           focus:ring-[#9F7AEA]/50 
                           placeholder-[#A0AEC0] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg 
                         bg-gradient-to-r from-[#6B46C1] to-[#4299E1] 
                         hover:from-[#805AD5] hover:to-[#2B6CB0] 
                         text-white font-bold transition-all duration-300 
                         transform hover:scale-105 
                         flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-6 text-center text-[#A0AEC0] text-sm">
            <p>Need immediate help? Email us at</p>
            <a
              href="mailto:musaiyab2003@gmail.com"
              className="text-[#9F7AEA] hover:underline"
            >
              musaiyab2003@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
