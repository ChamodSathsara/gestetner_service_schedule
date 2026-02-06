"use client";

import { useState } from "react";
import { useApiConfig } from "@/hooks/apiconfig";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const { resetPassword } = useApiConfig();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(newPassword);
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 text-sm">
          Create a new secure password for your account
        </p>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
              placeholder="Enter new password"
              disabled={loading}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors bg-white"
              placeholder="Confirm new password"
              disabled={loading}
            />
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs font-medium text-blue-900 mb-2">
              Password must contain:
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                At least 8 characters
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Password reset successfully!
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Bottom Fixed Button */}
      <div className="p-6 pb-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-base shadow-lg hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Resetting...
            </span>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  );
}
