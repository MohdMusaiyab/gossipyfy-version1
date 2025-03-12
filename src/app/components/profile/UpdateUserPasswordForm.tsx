"use client";
import React, { useState, FormEvent } from "react";
import { updatePassword } from "@/actions/user/updatePassword";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";

const UpdateUserPasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { data: session, update } = useSession();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNewPassword(newValue);
    checkPasswordStrength(newValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePassword(newPassword);
      setStatusMessage("Password updated successfully");
      setNewPassword(""); // Clear password field after successful update
      setPasswordStrength(0);
    } catch (error) {
      setStatusMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
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
          htmlFor="password"
          className="block text-lg font-semibold text-white mb-2"
        >
          New Password
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-2">
            <Lock className="h-5 w-5 text-indigo-400" />
          </div>

          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="mt-2 pl-10 pr-10 p-3 block w-full bg-white/5 text-indigo-100 
                     border border-white/10 rounded-lg shadow-inner
                     focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50
                     placeholder-indigo-300/50 backdrop-blur-sm
                     transition duration-200"
            placeholder="Enter new password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center mt-2
                     text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Password strength indicator */}
        {newPassword && (
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-indigo-100">Password Strength</span>
              <span className="text-sm text-indigo-100">
                {passwordStrength <= 2
                  ? "Weak"
                  : passwordStrength <= 3
                  ? "Medium"
                  : "Strong"}
              </span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStrengthColor()} transition-all duration-300`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
            <ul className="mt-2 text-sm text-indigo-200/70 space-y-1">
              <li className={newPassword.length >= 8 ? "text-green-400" : ""}>
                • At least 8 characters
              </li>
              <li className={/[A-Z]/.test(newPassword) ? "text-green-400" : ""}>
                • At least one uppercase letter
              </li>
              <li className={/[0-9]/.test(newPassword) ? "text-green-400" : ""}>
                • At least one number
              </li>
              <li
                className={
                  /[^A-Za-z0-9]/.test(newPassword) ? "text-green-400" : ""
                }
              >
                • At least one special character
              </li>
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={
            isLoading ||
            passwordStrength < 3 ||
            session.user.email === "guestemail@gmail.com"
          }
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
            {isLoading ? "Updating..." : "Update Password"}
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

export default UpdateUserPasswordForm;
