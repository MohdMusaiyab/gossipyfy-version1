"use client";

import React from 'react';
import { Shield, Lock, Globe, Database, User, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const policyItems = [
    {
      icon: <Shield className="w-6 h-6 text-[#9F7AEA]" />,
      title: "Information We Collect",
      description: "We collect information you provide directly to us, such as when you create an account, use our services, or contact our support team. This may include your name, email address, payment information, and other details you choose to provide."
    },
    {
      icon: <Lock className="w-6 h-6 text-[#4299E1]" />,
      title: "How We Use Your Information",
      description: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions."
    },
    {
      icon: <Globe className="w-6 h-6 text-[#9F7AEA]" />,
      title: "Information Sharing",
      description: "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, or when required by law."
    },
    {
      icon: <Database className="w-6 h-6 text-[#4299E1]" />,
      title: "Data Security",
      description: "We implement appropriate technical and organizational measures to protect the security of your personal information, including encryption, access controls, and regular security audits."
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] 
                 py-12 px-4 md:px-8 lg:px-16"
    >
      <div 
        className="max-w-4xl mx-auto bg-[#1E2133] rounded-2xl 
                   shadow-2xl p-8 md:p-12 
                   border border-[#9F7AEA]/20 backdrop-blur-md"
      >
        <div className="text-center mb-10">
        <h1
  style={{
    background: "linear-gradient(to right, #9F7AEA, #4299E1)", // matches Tailwind gradient
    WebkitBackgroundClip: "text", // ensures gradient applies to text in most browsers
    backgroundClip: "text",
    color: "transparent",
  }}
  className="text-4xl font-bold mb-4"
>
  Privacy Policy
</h1>

          <p className="text-[#A0AEC0] max-w-2xl mx-auto">
            Last Updated: November 7, 2024
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 
              className="text-2xl font-semibold mb-4 
                         text-white flex items-center gap-3"
            >
              <FileText className="w-7 h-7 text-[#9F7AEA]" />
              Introduction
            </h2>
            <p className="text-[#A0AEC0] leading-relaxed">
              At our company, we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our services.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            {policyItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#2D3748]/30 p-6 rounded-lg 
                           border border-[#4299E1]/20 
                           hover:border-[#9F7AEA]/40 
                           transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="ml-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[#A0AEC0]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <section>
            <h2 
              className="text-2xl font-semibold mb-4 
                         text-white flex items-center gap-3"
            >
              <User className="w-7 h-7 text-[#4299E1]" />
              Your Rights
            </h2>
            <ul className="list-disc pl-5 text-[#A0AEC0] space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Restrict certain data processing activities</li>
            </ul>
          </section>

          <div className="bg-[#2D3748]/30 p-6 rounded-lg border border-[#4299E1]/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-[#A0AEC0] mb-4">
              If you have any questions about this Privacy Policy, 
              please contact us at:
            </p>
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

export default PrivacyPolicyPage;