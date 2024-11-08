"use client";
import React from "react";
import { motion } from "framer-motion";

const Pricing = () => {
  const features = [
    "Access to exclusive content",
    "Join a premium network of creators and listeners",
    "Early access to new content",
    "HD content quality",
  ];

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
            Premium{" "}
            <span
  style={{
    background: "linear-gradient(to right, #9f7aea, #6366f1, #4299e1)", // Exact same gradient
    backgroundClip: "text", // Clip the background to the text
    WebkitBackgroundClip: "text", // For better cross-browser support (Safari)
    color: "transparent", // Ensure text is transparent to show the gradient
  }}
>
  Experience
</span>

          </h2>
          <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
            Unlock all premium features with our affordable monthly subscription
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="relative group">
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />

            <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.929C9.33 2.38 10.67 2.38 10.951 2.929L12.071 5.5h3.743c.621 0 1.084.684.742 1.203l-3.016 4.165 1.128 4.89c.218.944-1.062 1.689-1.683 1.049l-4.56-4.035-4.56 4.035c-.621.64-1.902-.105-1.684-1.049l1.128-4.89-3.016-4.165c-.342-.519.121-1.203.742-1.203h3.743L9.049 2.929z" />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    PREMIUM MEMBERSHIP
                  </span>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Premium Plan
                </h3>
                <div className="flex items-end justify-center gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">₹50</span>
                  <span className="text-purple-200/80 mb-1">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.4-5.6a1 1 0 01-1.4-1.4l3-3a1 1 0 011.4 1.4l-3 3zm3.2-6a1 1 0 00-1.4-1.4l-3 3a1 1 0 001.4 1.4l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-purple-200/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/payment" // Link to the payment page
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-center block transition-all duration-300"
              >
                Get Started Now
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Money back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-purple-200/60 mt-8"
        >
          30-day money-back guarantee • Cancel anytime
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
