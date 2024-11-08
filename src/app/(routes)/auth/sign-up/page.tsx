"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Mail, User, Lock, ArrowRight, Loader } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    checkPasswordStrength(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      if (response.ok) {
        setSuccess("Sign up successful! Redirecting to login...");
        setError("");
        router.push("/auth/sign-in");
      } else {
        const data = await response.json();
        setError(data.message || "Signup failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const isFormValid = email && username && passwordStrength >= 3;

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#090919] to-[#161837]">
        <Loader className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#090919] to-[#161837]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      
      <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="w-full my-20 max-w-md space-y-8 rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h1
              className="text-4xl font-bold"
              style={{
                background: "linear-gradient(to right, #a855f7, #667eea, #4299e1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Create Account
            </h1>
            <p className="mt-2 text-gray-300">Join us on this journey</p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-4 text-red-400">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-green-500/10 p-4 text-green-400">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="email">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="username">
                Username
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Create a password"
                />
              </div>

              {password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">
                      Password Strength{" "}
                      <span className="font-medium">
                        {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                      </span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>

                  <ul className="mt-2 text-sm text-gray-400">
                    <li className={`${password.length >= 8 ? "text-green-400" : "text-red-400"}`}>
                      - At least 8 characters
                    </li>
                    <li className={`${/[A-Z]/.test(password) ? "text-green-400" : "text-red-400"}`}>
                      - One uppercase letter
                    </li>
                    <li className={`${/[a-z]/.test(password) ? "text-green-400" : "text-red-400"}`}>
                      - One lowercase letter
                    </li>
                    <li className={`${/[0-9]/.test(password) ? "text-green-400" : "text-red-400"}`}>
                      - One number
                    </li>
                    <li className={`${/[^A-Za-z0-9]/.test(password) ? "text-green-400" : "text-red-400"}`}>
                      - One special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`group relative w-full overflow-hidden rounded-lg ${
                isFormValid ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-500"
              } p-4 text-white transition-all duration-300 ease-in-out focus:outline-none`}
            >
              <span className="absolute right-5 top-1/2 -translate-y-1/2 transform transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight size={20} />
              </span>
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium transition-colors duration-300"
              style={{
                background: "linear-gradient(to right, #a855f7, #667eea, #4299e1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
