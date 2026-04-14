"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import {
  isSignInWithEmailLink,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { FirebaseError } from "firebase/app";

function getFirebaseAuthErrorMessage(err: unknown): string {
  const code = (err as FirebaseError | undefined)?.code;
  if (!code) return err instanceof Error ? err.message : "Authentication failed";

  switch (code) {
    case "auth/operation-not-allowed":
      return "Email auth is disabled in Firebase. Enable Email/Password and Email link in Firebase Authentication > Sign-in method.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a bit and try again.";
    default:
      return err instanceof Error ? err.message : "Authentication failed";
  }
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<"credentials" | "email_link" | "verifying_link">(
    "credentials"
  );
  const [emailLinkPending, setEmailLinkPending] = useState(false);
  const [linkEmailInput, setLinkEmailInput] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const router = useRouter();

  // Try to redirect back securely after checkout prompt
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const targetPath = nextParam ? decodeURIComponent(nextParam) : "/";
  const continueUrl = useMemo(() => {
    const base =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
    const url = new URL("/login", base);
    if (nextParam) url.searchParams.set("next", nextParam);
    return url.toString();
  }, [nextParam]);

  useEffect(() => {
    const href = window.location.href;
    if (!isSignInWithEmailLink(auth, href)) return;
    setStage("verifying_link");

    const pendingEmail =
      window.localStorage.getItem("pendingLoginEmail") || email.trim();
    if (!pendingEmail) {
      setEmailLinkPending(true);
      setStage("email_link");
      setInfo("Enter your email to complete sign-in from this verification link.");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setInfo("");
    setError("");

    signInWithEmailLink(auth, pendingEmail, href)
      .then(() => {
        if (cancelled) return;
        window.localStorage.removeItem("pendingLoginEmail");
        window.location.replace(targetPath);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = getFirebaseAuthErrorMessage(err);
        setError(message);
        setEmailLinkPending(true);
        setStage("email_link");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [email, router, targetPath]);

  const handleCompleteEmailLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const enteredEmail = linkEmailInput.trim().toLowerCase();
    if (!enteredEmail) {
      setError("Please enter your email to continue.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailLink(auth, enteredEmail, window.location.href);
      window.localStorage.removeItem("pendingLoginEmail");
      setInfo("Successfully verified. Redirecting...");
      router.replace(targetPath);
    } catch (err: unknown) {
      setError(getFirebaseAuthErrorMessage(err));
    }
    setLoading(false);
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      await signOut(auth);
      await sendSignInLinkToEmail(auth, email.trim(), {
        url: continueUrl,
        handleCodeInApp: true,
      });
      window.localStorage.setItem("pendingLoginEmail", email.trim());
      setStage("email_link");
      setEmailLinkPending(false);
      setShowForgotPassword(false);
      setInfo("Verification link sent to your email. Open it to complete login.");
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      setError(message);
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setInfo("");
    const targetEmail = forgotEmail.trim() || email.trim();
    if (!targetEmail) {
      setError("Enter your email first.");
      return;
    }
    setForgotLoading(true);
    try {
      await sendPasswordResetEmail(auth, targetEmail);
      setInfo("Password reset email sent. Check your inbox.");
      setShowForgotPassword(false);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      setError(message);
    }
    setForgotLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push(targetPath);
    } catch (err: unknown) {
      const message = getFirebaseAuthErrorMessage(err);
      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
          Welcome Back
        </h1>
        {nextParam && (
          <p className="text-center text-sm text-blue-600 mb-6 bg-blue-50 p-2 rounded-md">
            Please login before checking out.
          </p>
        )}

        {stage === "credentials" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword((s) => !s);
                    setForgotEmail(email.trim());
                  }}
                  disabled={loading}
                  className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-60"
                >
                  Forgot password?
                </button>
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {info && <p className="text-green-600 text-xs">{info}</p>}
            {showForgotPassword && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2">
                <p className="text-xs text-gray-700 font-medium">Reset password</p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your account email"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={forgotLoading}
                    className="text-sm px-3 py-1.5"
                  >
                    {forgotLoading ? "Sending..." : "Send reset email"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-xs text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Sending verification link..." : "Sign In with Email"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            {stage === "verifying_link" ? (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
                Verifying your email link, please wait...
              </div>
            ) : (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
                Verification link sent to <span className="font-semibold">{email.trim()}</span>.
              </div>
            )}
            {emailLinkPending ? (
              <form onSubmit={handleCompleteEmailLinkSignIn} className="space-y-3">
                <p className="text-sm text-gray-600">
                  Enter the email address used for login to complete verification.
                </p>
                <input
                  type="email"
                  required
                  value={linkEmailInput}
                  onChange={(e) => setLinkEmailInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="you@example.com"
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Verifying..." : "Complete Sign In"}
                </Button>
              </form>
            ) : (
              <p className="text-sm text-gray-600">
                Open your inbox and click the login verification link to continue.
              </p>
            )}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {info && <p className="text-green-600 text-xs">{info}</p>}
            {stage !== "verifying_link" && (
              <Button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full mt-2"
              >
                {loading ? "Sending..." : "Resend Verification Link"}
              </Button>
            )}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={async () => {
                  await signOut(auth);
                  setStage("credentials");
                  setInfo("");
                  setError("");
                }}
                disabled={loading}
                className="text-sm text-gray-600 hover:underline disabled:opacity-60"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {stage === "credentials" && (
          <>
            <div className="mt-6 flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="px-4 text-sm text-gray-400 bg-white font-medium">OR</span>
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              type="button"
              className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 transition-all font-semibold shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 shrink-0"
              />
              <span>Continue with Google</span>
            </button>
          </>
        )}

        <p className="text-center mt-8 text-sm text-gray-600">
          New to Kashish Life Science®?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
