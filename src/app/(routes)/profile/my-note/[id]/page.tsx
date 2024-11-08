"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { singleNote } from "@/actions/notes/singleNote";
import { deleteNote } from "@/actions/notes/deleteNote";
import { deleteComments } from "@/actions/notes/deleteComments";
import { updateVoiceNote } from "@/actions/notes/updateVoiceNote";
import { Loader2, Save, AlertCircle, Trash2 } from "lucide-react";
import { Category } from "../../../../../types/Categories";
import { Language } from "../../../../../types/Languages";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPremium: false,
    category: Category.OTHER,
    language: Language.OTHER,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [likes, setLikes] = useState(0);
  //Now a state of array with objects having id and text
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const handleCommentDelete = async (commentId:number) => {
    try {
      const result = await deleteComments(id, commentId);
      if (result.success) {
        // Update the comments list by filtering out the deleted comment
        setComments(comments.filter(comment => comment.id !== commentId));
        
        // Show notification
        const notification = document.getElementById("notification");
        notification.textContent = "Comment deleted successfully!";
        notification.classList.remove("translate-y-[-100%]");
        setTimeout(() => {
          notification.classList.add("translate-y-[-100%]");
        }, 3000);
      } else {
        // Handle error
        const notification = document.getElementById("notification");
        notification.textContent = result.message;
        notification.classList.remove("translate-y-[-100%]");
        setTimeout(() => {
          notification.classList.add("translate-y-[-100%]");
        }, 3000);
      }
      setShowDeleteModal(false);
      setCommentToDelete(null);
    } catch (error) {
      console.error("Error deleting comment:", error);
      const notification = document.getElementById("notification");
      notification.textContent = "Error deleting comment";
      notification.classList.remove("translate-y-[-100%]");
      setTimeout(() => {
        notification.classList.add("translate-y-[-100%]");
      }, 3000);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedNote = await singleNote(id as string);
          setNote(fetchedNote);
          setLikes(fetchedNote.likes.length);
          setComments(fetchedNote.comments);
          setFormData({
            title: fetchedNote.title,
            description: fetchedNote.description || "",
            isPremium: fetchedNote.isPremium,
            category: fetchedNote.category,
            language: fetchedNote.language,
          });
        } catch (err) {
          setError("Failed to load note. It may not exist.");
        } finally {
          setLoading(false);
        }
      };
      fetchNote();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateVoiceNote(id, formData);
      const notification = document.getElementById("notification");
      notification.classList.remove("translate-y-[-100%]");
      setTimeout(() => {
        notification.classList.add("translate-y-[-100%]");
      }, 3000);
    } catch (err) {
      setError("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this voice note? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const result = await deleteNote(id);
      if (result.success) {
        const notification = document.getElementById("notification");
        notification.textContent = "Voice note deleted successfully!";
        notification.classList.remove("translate-y-[-100%]");

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }
    } catch (err) {
      setError("Failed to delete note.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <Loader2 className="w-8 h-8 animate-spin text-[#9F7AEA]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#090919] to-[#161837]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-[#9F7AEA] mx-auto" />
          <p className="text-xl text-[#A0AEC0]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090919] to-[#161837] py-12 px-4">
      <div
        id="notification"
        className="fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-[-100%] transition-transform duration-300 z-50 bg-gradient-to-r from-[#6B46C1] to-[#4299E1] text-white px-6 py-3 rounded-b-lg shadow-lg"
      >
        Voice note updated successfully!
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
          <div
            className="absolute inset-0 -z-10 bg-gradient-radial from-[rgba(99,102,241,0.1)] to-transparent rounded-2xl"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />

          <h1
            className="text-3xl font-bold mb-8"
            style={{
              background: "linear-gradient(to right, #9F7AEA, #4299E1)", // Gradient applied
              WebkitBackgroundClip: "text", // For Safari and Chrome
              backgroundClip: "text", // Standard support
              color: "transparent", // Makes the text transparent to show the gradient
            }}
          >
            Update Voice Note
          </h1>

          {note && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#A0AEC0]">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F7AEA]/50 text-white placeholder-white/50 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#A0AEC0]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F7AEA]/50 text-white placeholder-white/50 transition-all duration-200"
                />
              </div>
              <div>
                <audio
                  controls
                  className="w-full"
                  src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${note.fileUrl}`}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9F7AEA]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#6B46C1] peer-checked:to-[#4299E1]"></div>
                  <span className="ml-3 text-sm font-medium text-[#A0AEC0]">
                    Premium Content
                  </span>
                </label>
                <span className="text-sm font-semibold text-[#A0AEC0]">
                  {} Likes: {likes}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#A0AEC0]">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F7AEA]/50 text-white placeholder-white/50 transition-all duration-200"
                  >
                    {Object.values(Category).map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-[#161837] text-white"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#A0AEC0]">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F7AEA]/50 text-white placeholder-white/50 transition-all duration-200"
                  >
                    {Object.values(Language).map((lang) => (
                      <option
                        key={lang}
                        value={lang}
                        className="bg-[#161837] text-white"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <button
                  type="submit"
                  disabled={saving || deleting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6B46C1] to-[#4299E1] hover:from-[#805AD5] hover:to-[#2B6CB0] text-white rounded-lg font-medium shadow-lg shadow-[#9F7AEA]/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Update Voice Note</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg font-medium shadow-lg shadow-red-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Note</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-[#A0AEC0] mb-4">Comments</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-[#A0AEC0]"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm">{comment.text}</p>
                  <button 
                    onClick={() => {
                      setCommentToDelete(comment);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Delete comment"
                  >
                    <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#A0AEC0]">No comments available.</p>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#161837] border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                Delete Comment
              </h3>
              <p className="text-[#A0AEC0] mb-6">
                Are you sure you want to delete this comment? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCommentToDelete(null);
                  }}
                  className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCommentDelete(commentToDelete.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
