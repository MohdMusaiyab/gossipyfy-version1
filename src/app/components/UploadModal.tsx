"use client";
import React, { useState } from "react";
import axios from "axios";
import { X, Upload, Loader2 } from "lucide-react";
import { Category } from "@/types/Categories";
import { Language } from "@/types/Languages";

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
    category: Category.MUSIC
  });

  const [file, setFile] = useState<File | null>(null);

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
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("Upload response:", res.data);
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({
          title: "",
          description: "",
          language: Language.ENGLISH,
          category: Category.MUSIC
        });
        setFile(null);
      }, 2000);
    } catch (error) {
      setError("Failed to upload. Please try again.");
      console.error("Error uploading:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("File selected:", e.target.files[0]);
    }
  }

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
            <div className="relative bg-gradient-to-br from-[#1e1e2e] to-[#2a2a40] rounded-lg w-full max-w-md p-6 shadow-2xl">
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
                    <label htmlFor="title" className="block text-sm font-medium text-gray-200">
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-200">
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
                    <label htmlFor="language" className="block text-sm font-medium text-gray-200">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(Language).map(lang => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-200">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {Object.values(Category).map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-200">
                      File
                    </label>
                    <input
                      id="file"
                      type="file"
                      onChange={handleFile}
                      required
                      className="w-full px-3 py-2 bg-[#33334d] border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium ${
                      loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                    } transition-colors`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload'
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
