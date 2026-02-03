// components/Settings.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signOut } from 'next-auth/react'; // ← if using next-auth
// If you're NOT using next-auth → replace with your logout logic

export default function Settings() {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = async () => {
    try {
      // If using next-auth:
      //   await signOut({ callbackUrl: '/' }); // or '/login'

      // If using your own auth system:
      // await fetch('/api/logout', { method: 'POST' });
      router.push("/login");
      // router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleResetPasswordClick = () => {
    // router.push('/reset-password');
    router.push("/login");
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-gray-900 px-4 py-8 md:py-12 ">
      <div className="mx-auto max-w-md md:max-w-2xl">
        {/* Card-like container - better on desktop */}
        <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800 md:p-7 md:shadow">
          {/* Reset Password Button */}
          <button
            onClick={handleResetPasswordClick}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-5 py-4 text-left text-gray-800 transition hover:bg-gray-50 active:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700/70 md:py-5"
          >
            <div>
              <div className="font-medium">Reset Password</div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Change your account password
              </div>
            </div>
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="flex w-full items-center justify-between rounded-xl border border-red-200 px-5 py-4 text-left text-red-600 transition hover:bg-red-50 active:bg-red-100 dark:border-red-800/40 dark:text-red-400 dark:hover:bg-red-950/30 md:py-5"
          >
            <div>
              <div className="font-medium">Log Out</div>
              <div className="mt-1 text-sm text-red-500/80 dark:text-red-400/80">
                Sign out of your account
              </div>
            </div>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Log Out?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 rounded-lg bg-red-600 py-3 font-medium text-white hover:bg-red-700 active:bg-red-800"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
