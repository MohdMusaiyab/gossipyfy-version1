"use client";

import React from "react";
import {
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
} from "lucide-react";

const GuidelinesPage = () => {
  const uploadGuidelines = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#48BB78]" />,
      title: "Acceptable Content",
      guidelines: [
        "Educational and academic notes",
        "Well-structured and clear content",
        "Properly cited sources",
        "Original work or properly attributed materials",
      ],
    },
    {
      icon: <XCircle className="w-6 h-6 text-[#F56565]" />,
      title: "Prohibited Content",
      guidelines: [
        "Plagiarized materials",
        "Copyrighted content without permission",
        "Offensive or discriminatory content",
        "Explicit or inappropriate materials",
        "Partial or incomplete notes",
      ],
    },
  ];

  const technicalRequirements = [
    {
      icon: <FileText className="w-5 h-5 text-[#4299E1]" />,
      title: "File Formats",
      description: "Supported formats: MP3, WAV, AAC, FLAC, M4A",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#9F7AEA]" />,
      title: "File Size Limit",
      description: "Maximum 100 MB per file",
    },
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
              WebkitBackgroundClip: "text", // ensures compatibility across browsers
              backgroundClip: "text", // for text-only clipping
              color: "transparent", // makes the text transparent to show the gradient
            }}
            className="text-4xl font-bold mb-4"
          >
            Notes Upload Guidelines
          </h1>

          <p className="text-[#A0AEC0] max-w-2xl mx-auto">
            Ensuring Quality, Integrity, and Compliance
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2
              className="text-2xl font-semibold mb-6 
                         text-white flex items-center gap-3"
            >
              <Upload className="w-7 h-7 text-[#9F7AEA]" />
              Upload Policy
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {uploadGuidelines.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#2D3748]/30 p-6 rounded-lg 
                             border border-[#4299E1]/20"
                >
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="ml-3 text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 text-[#A0AEC0] space-y-2">
                    {category.guidelines.map((guideline, idx) => (
                      <li key={idx}>{guideline}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="text-2xl font-semibold mb-6 
                         text-white flex items-center gap-3"
            >
              <Shield className="w-7 h-7 text-[#4299E1]" />
              Technical Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {technicalRequirements.map((req, index) => (
                <div
                  key={index}
                  className="bg-[#2D3748]/30 p-6 rounded-lg 
                             border border-[#4299E1]/20 
                             flex items-center"
                >
                  {req.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {req.title}
                    </h3>
                    <p className="text-[#A0AEC0]">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="text-2xl font-semibold mb-6 
                         text-white flex items-center gap-3"
            >
              <AlertTriangle className="w-7 h-7 text-[#ED8936]" />
              Important Notices
            </h2>

            <div
              className="bg-[#2D3748]/30 p-6 rounded-lg 
                         border border-[#ED8936]/20"
            >
              <ul className="list-disc pl-5 text-[#A0AEC0] space-y-3">
                <li>
                  Users are responsible for the originality and accuracy of
                  uploaded content
                </li>
                <li>Repeated violations may result in account suspension</li>
                <li>All uploads are subject to review and moderation</li>
                <li>Copyright infringement will not be tolerated</li>
              </ul>
            </div>
          </section>

          <div
            className="bg-[#2D3748]/30 p-6 rounded-lg 
                       border border-[#4299E1]/20 text-center"
          >
            <p className="text-[#A0AEC0] mb-4">
              If you have any questions about these guidelines, please contact
              our support team.
            </p>
            <a
              href="mailto:musaiyab2003@gmail.com"
              className="text-[#9F7AEA] hover:underline text-lg"
            >
              musaiyab2003@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
