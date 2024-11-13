"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Upload, Loader2 } from "lucide-react";
import { Category } from "@/types/Categories";
import { Language } from "@/types/Languages";
import { getPrivacyPolicyStatus } from "@/actions/user/getPrivacyPolicyStatus"; // Make sure this function returns the user's privacy policy acceptance status
import PrivacyForm from "./PrivacyPolicy/PrivacyForm";

const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    language: Language;
    category: Category;
  }>({
    title: "",
    description: "",
    language: Language.ENGLISH,
    category: Category.MUSIC,
  });

  const [file, setFile] = useState<File | null>(null);

  // State to track if the user has accepted the privacy policy
  const [hasAcceptedPrivacyPolicy, setHasAcceptedPrivacyPolicy] = useState<
    boolean | null
  >(null);

  // Fetch the privacy policy status when the component is mounted
  useEffect(() => {
    const fetchPrivacyPolicyStatus = async () => {
      try {
        const status = await getPrivacyPolicyStatus(); // Fetch privacy policy status
        setHasAcceptedPrivacyPolicy(status);
      } catch (error) {
        setError("Failed to fetch privacy policy status.");
        console.log(error);
      }
    };

    fetchPrivacyPolicyStatus();
  }, []);

  // Clear error automatically after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on component unmount or error change
    }
  }, [error]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("language", formData.language);
    data.append("category", formData.category);

    if (file) {
      data.append("file", file);
    }

    try {
      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({
          title: "",
          description: "",
          language: Language.ENGLISH,
          category: Category.MUSIC,
        });
        setFile(null);
      }, 2000);
    } catch (error) {
      setError("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form data change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSizeInMB = 100;
      const allowedFileTypes = ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/flac', 'audio/m4a'];
  
      if (selectedFile.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size should not exceed ${maxSizeInMB} MB.`);
        setFile(null); // Reset the file if it exceeds the size limit
      } else if (!allowedFileTypes.includes(selectedFile.type)) {
        setError('Only audio files are allowed.');
        setFile(null); // Reset the file if it's not an audio file
      } else {
        setFile(selectedFile);
        setError(null); // Clear any previous error if file is valid
      }
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
      >
        <Upload size={20} />
        Upload Note
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto text-white">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative mt-10 bg-gradient-to-br from-[#1e1e2e] to-[#2a2a40] rounded-lg w-full max-w-md p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Upload Note
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-300" />
                </button>
              </div>

              {/* Show Privacy Form if privacy policy not accepted */}
              {hasAcceptedPrivacyPolicy === false && <PrivacyForm />}

              {success ? (
                <div className="bg-green-50 border border-green-400 rounded-lg p-4 mb-4 text-green-800">
                  <p>Upload successful! Modal will close shortly...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-400 rounded-lg p-4 mb-4 text-red-800">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      required
                      placeholder="Enter title"
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      name="description"
                      required
                      placeholder="Enter description"
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(Language).map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium text-gray-200"
                    >
                      File
                    </label>
                    <input
                      id="file"
                      type="file"
                      onChange={handleFile}
                      accept="audio/*"
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={
                      loading || !file || hasAcceptedPrivacyPolicy === false
                    }
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                    ) : (
                      "Upload"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
