'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16">
      <h3>Login</h3>
      <p>Choose a login method to continue.</p>
      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Login with Google
      </button>

      <button
        className="rounded-4 bg-primary p-8 text-white"
        onClick={() => {
          signIn('credentials', {
            email: 'tien3107@yopmail.com',
            password: 'Tien3107@',
            callbackUrl: '/chat/24d4608f-39f8-4d6e-b4ee-6073d0c058c7',
          });
        }}
      >
        Demo session
      </button>
    </div>
  );
}
