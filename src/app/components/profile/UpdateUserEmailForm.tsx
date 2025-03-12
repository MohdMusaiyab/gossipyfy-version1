"use client";
import React, { useState, FormEvent } from "react";
import { updateEmail } from "@/actions/user/updateEmail";
import { useSession } from "next-auth/react";
import { Loader2, Mail } from "lucide-react";

interface Props {
  currentEmail: string;
}

const UpdateUserEmailForm: React.FC<Props> = ({ currentEmail }) => {
  const { data: session, update } = useSession();
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = await updateEmail(newEmail);
      setStatusMessage(`Email updated successfully to ${updatedUser.email}`);
      await update({
        user: {
          ...session?.user,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      setStatusMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent rounded-lg" />

      <form
        onSubmit={handleSubmit}
        className="relative mt-6 bg-white/5 backdrop-blur-xl p-6 rounded-lg border border-white/10 shadow-xl"
      >
        <label
          htmlFor="email"
          className="block text-lg font-semibold text-white mb-2"
        >
          New Email Address
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-2">
            <Mail className="h-5 w-5 text-indigo-400" />
          </div>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mt-2 pl-10 p-3 block w-full bg-white/5 text-indigo-100 
                     border border-white/10 rounded-lg shadow-inner
                     focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
                     placeholder-indigo-300/50 backdrop-blur-sm
                     transition duration-200"
            placeholder="Enter new email address"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || session.user.email === "guestemail@gmail.com"}
          className="mt-6 w-full relative group overflow-hidden rounded-lg
                   bg-gradient-to-r from-purple-500 to-blue-500 
                   hover:from-purple-600 hover:to-blue-600
                   text-white font-semibold py-3 px-4
                   transition-all duration-200 ease-in-out
                   disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative flex items-center justify-center gap-2">
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            )}
            {isLoading ? "Updating..." : "Update Email"}
          </span>
        </button>

        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-lg backdrop-blur-sm
                         ${
                           statusMessage.includes("successfully")
                             ? "bg-green-500/10 text-green-400 border border-green-500/20"
                             : "bg-red-500/10 text-red-400 border border-red-500/20"
                         }`}
          >
            {statusMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateUserEmailForm;
