"use client";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import {
  UserCircle2,
  DollarSign,
  Layers, 
  Users,
  Shield,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Stay Anonymous",
      description:
        "Your identity stays private. Share your thoughts without revealing personal details, letting your content speak for itself.",
      icon: UserCircle2,
    },
    {
      title: "Share & Earn",
      description:
        "Post your content, gain subscribers, and start earning. The more engagement you receive, the more you can monetize.",
      icon: DollarSign,
    },
    {
      title: "Subscription Tiers",
      description:
        "Enjoy exclusive features and content through our monthly subscription plans. Get more benefits, including analytics, customization, and increased earning potential.",
      icon: Layers,
    },
    {
      title: "Build Your Subscriber Base",
      description:
        "Grow your audience by letting users subscribe to your content. Build a community of loyal followers who can support your journey.",
      icon: Users,
    },
    {
      title: "Share Confessions Anonymously",
      description:
        "Express your deepest thoughts and confessions without revealing your identity. Release guilt and stress in a safe and supportive environment.",
      icon: UserCircle2,
    },
    {
      title: "Secure Payments",
      description:
        "Earn from your content with our secure and fast payment system. Receive payouts directly to your preferred method.",
      icon: Shield,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #090919, #161837)",
        }}
      >
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

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-6">
            Why Choose{" "}
            <span
              className="text-transparent"
              style={{
                background:
                  "linear-gradient(to right, #9f7aea, #4c51bf, #4299e1)", // gradient remains the same
                backgroundClip: "text", // Clips the gradient to the text
                WebkitBackgroundClip: "text", // Ensures cross-browser compatibility (Safari)
              }}
            >
              Gossipyfy
            </span>
          </h2>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
            Discover the features that make Gossipyfy the perfect platform for
            sharing your voice and building your community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="group relative"
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />

              <div className="relative h-full p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="inline-block p-3 bg-purple-500/10 rounded-lg mb-4">
                      <feature.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3
                      className="text-2xl font-semibold"
                      style={{
                        background:
                          "linear-gradient(to right, #9f7aea, #4c51bf, #4299e1)", // Maintain the same gradient
                        backgroundClip: "text", // Clip the background to the text
                        WebkitBackgroundClip: "text", // Ensure cross-browser compatibility (Safari)
                        color: "transparent", // Make the text transparent to show the gradient
                      }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-purple-200/80 flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="group px-8 py-4 rounded-full relative overflow-hidden">
            <Link
              href="/explore"
              className="text-white p-4 rounded-lg font-semibold relativeinset-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-600 transition-all"
            >
              Get Started Now
            </Link>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
