'use client';

import { useMemo } from 'react';

import { useAuth } from '@/lib/authentication/auth-context';

export default function LoginClient() {
  const { signInWithProvider } = useAuth();

  // Tính sẵn redirectTo 1 lần ở client
  const redirectTo = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get('callbackUrl') || '/view-session';
    return `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent(
      callbackUrl
    )}`;
  }, []);

  return (
    <>
      <h3>Login</h3>
      <p>Choose a login method to continue.</p>
      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('google', redirectTo);
        }}
      >
        Login with Google
      </button>
      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('kakao', redirectTo);
        }}
      >
        Login with KakaoTalk
      </button>
      {/* <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('apple', redirectTo);
        }}
      >
        Login with Apple
      </button> */}
    </>
  );
}
