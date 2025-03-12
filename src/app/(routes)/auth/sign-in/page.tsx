"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/explore");
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/explore");
    }
  };

  const handleGuestLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email: "guestemail@gmail.com",
      password: "Guest@123#123",
    });

    if (result?.error) {
      setError("Guest login failed. Please try again.");
    } else {
      router.push("/explore");
    }
  };

  const isButtonDisabled = !email || !password;

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#090919] to-[#161837] pb-10">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 pt-16 pb-20">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h1
              style={{
                background:
                  "linear-gradient(to right, #a855f7, #6366f1, #4299e1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              className="text-4xl font-bold"
            >
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-300">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-4 text-red-400">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label
                className="text-sm font-medium text-gray-300"
                htmlFor="email"
              >
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
              <label
                className="text-sm font-medium text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-900/50 py-3 pl-10 pr-4 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`group relative w-full overflow-hidden rounded-lg p-4 text-white transition-all duration-300 ${
                isButtonDisabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/25"
              }`}
            >
              <span className="relative flex items-center justify-center">
                Sign in with Credentials
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-gray-600" />
            <span className="absolute bg-[#161837] px-4 text-gray-400">or</span>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/explore" })}
            className="w-full rounded-lg border border-gray-600 bg-white/5 p-4 text-white transition-all duration-300 hover:bg-white/10"
          >
            Sign in with Google
          </button>
          <div className="relative flex items-center justify-center">
            <hr className="w-full border-gray-600" />
            <span className="absolute bg-[#161837] px-4 text-gray-400">or</span>
          </div>
          <button
            onClick={handleGuestLogin}
            className="w-full rounded-lg border border-gray-600 bg-white/5 p-4 text-white transition-all duration-300 hover:bg-white/10"
          >
            Login as Guest
          </button>

          <p className="text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium hover:opacity-80"
              style={{
                background: "linear-gradient(to right, #a855f7, #4299e1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
