"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { FirebaseError } from "firebase/app";

function getFirebaseAuthErrorMessage(err: unknown): string {
  const code = (err as FirebaseError | undefined)?.code;
  if (!code) return err instanceof Error ? err.message : "Authentication failed";

  switch (code) {
    case "auth/operation-not-allowed":
      return "Email signup is disabled in Firebase. Enable Email/Password in Firebase Authentication > Sign-in method.";
    case "auth/email-already-in-use":
      return "This email is already in use. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a bit and try again.";
    default:
      return err instanceof Error ? err.message : "Authentication failed";
  }
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      setError(message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">Create Account</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="At least 6 characters" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Type password again" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Creating..." : "Sign Up with Email"}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="px-4 text-sm text-gray-400 bg-white font-medium">OR</span>
          <div className="border-t border-gray-200 w-full"></div>
        </div>

        <button 
          onClick={handleGoogleSignup} 
          disabled={loading}
          type="button"
          className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-all font-semibold shadow-sm"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 shrink-0" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
