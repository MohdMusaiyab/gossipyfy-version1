"use client";

import { motion } from "framer-motion";
import React from "react";
import { Mic, Users, DollarSign } from "lucide-react";

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7 + i * 0.2,
        duration: 0.8,
      },
    }),
  };

  const features = [
    {
      title: "Share Your Talks",
      description:
        "Upload your conversations, thoughts, and talks with friends. Let the world hear what you have to say.",
      icon: Mic,
    },
    {
      title: "Build a Community",
      description:
        "Engage with your audience and grow your following by sharing unique and relatable content.",
      icon: Users,
    },
    {
      title: "Monetize Your Ideas",
      description:
        "As your talks get more attention, start earning from your content through views, ads, and sponsorships.",
      icon: DollarSign,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Background with animated gradients */}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl text-white md:text-7xl font-bold mb-8 "
          >
            Welcome to{" "}
            <span
              className="text-transparent"
              style={{
                background:
                  "linear-gradient(to right, #9f7aea, #4c51bf, #4299e1)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Gossipyfy
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-purple-200/80 leading-relaxed"
          >
            Step into a world where every voice matters. Share your stories,
            amplify your ideas, and connect with an audience that resonates with
            your unique perspective. Transform your conversations into
            opportunities and watch your community grow.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500">
                <div className="mb-6 inline-block p-4 bg-purple-500/10 rounded-lg">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3
                  className="text-2xl font-semibold mb-4 text-transparent"
                  style={{
                    background:
                      "linear-gradient(to right, #9f7aea, #4c51bf, #4299e1)", // your gradient
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text", // for better cross-browser support
                  }}
                >
                  {feature.title}
                </h3>

                <p className="text-lg text-purple-200/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Active Users", value: "10K+" },
            { label: "Daily Talks", value: "5K+" },
            { label: "Communities", value: "500+" },
            { label: "Creator Earnings", value: "$100K+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {stat.value}
              </h4>
              <p className="text-purple-200/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default About;
