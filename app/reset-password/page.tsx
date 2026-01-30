// app/reset-password/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<'email' | 'pin' | 'password'>('email');

  // ── Step 1: Email ───────────────────────────────────────
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);

  // ── Step 2: PIN / OTP ───────────────────────────────────
  const [pin, setPin] = useState<any>('');
  const [pinError, setPinError] = useState('');
  const [verifying, setVerifying] = useState(false);

  // ── Step 3: New Password ────────────────────────────────
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saving, setSaving] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Optional: pre-fill email if coming from somewhere
  useEffect(() => {
    const e = searchParams.get('email');
    if (e) setEmail(decodeURIComponent(e));
  }, [searchParams]);

  const handleSendPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setSending(true);

    try {
    //   const res = await fetch('/api/auth/reset-password/request', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     setEmailError(data.error || 'Failed to send PIN. Try again.');
    //     return;
    //   }

      setStep('pin');
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setVerifying(true);

    try {
    //   const res = await fetch('/api/auth/reset-password/verify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, pin }),
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     setPinError(data.error || 'Invalid or expired PIN.');
    //     return;
    //   }

      setStep('password');
    } catch (err) {
      setPinError('Verification failed. Try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setSaving(true);

    try {
    //   const res = await fetch('/api/auth/reset-password/complete', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, pin, newPassword: password }),
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     setPasswordError(data.error || 'Failed to reset password.');
    //     return;
    //   }

      // Success → redirect to login
      alert('Password reset successful! Please sign in.');
      router.push('/');
    } catch (err) {
      setPasswordError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reset Password
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {step === 'email' && "Enter your email to receive a PIN"}
            {step === 'pin' && `Enter the PIN sent to ${email}`}
            {step === 'password' && 'Choose a new password'}
          </p>
        </div>

        {/* ── STEP 1: Email ── */}
        {step === 'email' && (
          <form onSubmit={handleSendPin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
                autoFocus
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{emailError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending || !email.includes('@')}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending PIN...' : 'Send PIN'}
            </button>
          </form>
        )}

        {/* ── STEP 2: PIN ── */}
        {step === 'pin' && (
          <form onSubmit={handleVerifyPin} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                PIN (6 digits)
              </label>
              <input
                id="pin"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-widest dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••"
              />
              {pinError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={verifying || pin.length !== 6}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {verifying ? 'Verifying...' : 'Verify PIN'}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Didn't receive PIN? Try again
            </button>
          </form>
        )}

        {/* ── STEP 3: New Password ── */}
        {step === 'password' && (
  <form onSubmit={handleResetPassword} className="space-y-6">
    {/* New Password */}
    <div className="relative">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        New Password
      </label>
      <div className="relative mt-1">
        <input
          id="password"
          type={showNewPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          aria-label={showNewPassword ? 'Hide password' : 'Show password'}
        >
          {showNewPassword ? (
            // Eye icon - visible when password is shown
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            // Eye-off icon - visible when password is hidden
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </button>
      </div>
    </div>

    {/* Confirm Password */}
    <div className="relative">
      <label
        htmlFor="confirm"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Confirm Password
      </label>
      <div className="relative mt-1">
        <input
          id="confirm"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          {showConfirmPassword ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </button>
      </div>
    </div>

    {passwordError && (
      <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
    )}

    <button
      type="submit"
      disabled={saving}
      className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {saving ? 'Saving...' : 'Reset Password'}
    </button>
  </form>
)}
      </div>
    </div>
  );
}