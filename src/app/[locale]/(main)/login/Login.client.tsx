'use client';

import { useMemo } from 'react';

import { useAuth } from '@/lib/authentication/auth-context';

export default function LoginClient() {
  const { signInWithProvider } = useAuth();

  return (
    <>
      <h3>Login</h3>
      <p>Choose a login method to continue.</p>
      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('google');
        }}
      >
        Login with Google
      </button>
      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('kakao');
        }}
      >
        Login with KakaoTalk
      </button>
      {/* <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={async () => {
          await signInWithProvider('apple');
        }}
      >
        Login with Apple
      </button> */}
    </>
  );
}
