import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { COOKIE_PREFIX } from '@/utils/constants';

// Cookies should be secure in any environment that uses HTTPS.
const useSecureCookies = (process.env.AUTH_URL || '').startsWith('https://');

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, but we will handle it manually.
      credentials: {
        userId: { label: 'User ID', type: 'text' },
      },
      async authorize(credentials) {
        // This is where you would normally validate credentials against a database.
        // For our development purpose, we'll accept any non-empty userId.
        if (
          typeof credentials.userId === 'string' &&
          credentials.userId.length > 0
        ) {
          // Return the user object to be encoded in the JWT
          return { id: credentials.userId };
        }
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  // Add callbacks here if you want to modify the JWT or session objects
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
