import { SupabaseAdapter } from '@auth/supabase-adapter';
import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

import { ChatApi } from '@/lib/api/server';
import { COOKIE_PREFIX } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';

// === TYPE DEFINITIONS ===
// Extend the User type to include chatApiToken
interface ExtendedUser extends User {
  chatApiToken?: string;
}

// Extend the Session type to include chatApiToken
declare module 'next-auth' {
  interface Session {
    chatApiToken?: string;
  }
}

// === SECURITY CONFIGURATION ===
// Determine if cookies should be secure based on the environment
// Cookies should be secure in any environment that uses HTTPS
const useSecureCookies = (process.env.AUTH_URL || '').startsWith('https://');

// === NEXT-AUTH CONFIGURATION ===
export const {
  handlers: { GET, POST }, // Export handlers for API routes
  auth, // Export auth function for middleware and server components
} = NextAuth({
  // === DATABASE ADAPTER ===
  // Use Supabase adapter for persistent user data storage
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  // === PAGE ROUTE CONFIGURATION ===
  // Specify custom pages to use, especially the login page.
  // This tells NextAuth where to redirect users when they need to log in.
  // The paths should NOT include the locale. NextAuth will handle it.
  pages: {
    signIn: '/login',
    // signOut: '/logout', // Optional: specify a custom sign-out page
    // error: '/auth/error', // Optional: a page to display auth errors
  },

  // === COOKIE CONFIGURATION ===
  // Custom cookie names with our application prefix to avoid conflicts
  cookies: {
    // Session token - stores the encrypted session data
    sessionToken: {
      name: `${COOKIE_PREFIX}session-token`,
      options: {
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'lax', // CSRF protection while allowing normal navigation
        path: '/', // Available site-wide
        secure: useSecureCookies, // HTTPS only in production
      },
    },
    // Callback URL - stores the redirect destination after login
    callbackUrl: {
      name: `${COOKIE_PREFIX}callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    // CSRF token - additional security for state changes
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

  // === AUTHENTICATION PROVIDERS ===
  providers: [
    // Google OAuth2 Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    // Email/Password Provider
    // TODO: [AUTH-CREDENTIALS] This provider is currently for internal/testing use.
    // Discuss with the team if this should be exposed to end-users or removed.
    // The UI for this is not implemented by default.
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Custom authorization logic for email/password login
      async authorize(credentials) {
        // Validate required fields
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // Authenticate with our external Chat API
          const loginResponse = await ChatApi.login(
            credentials.email as string,
            credentials.password as string
          );

          // Extract user info and access token from the response
          const { data } = loginResponse;
          const { accessToken, user } = data;

          // Return a user object with the Chat API token
          // This will be passed to the jwt callback
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            chatApiToken: accessToken, // Store the external API token
          };
        } catch (error) {
          console.error('[AUTH_CREDENTIALS_ERROR]', error);
          // Return null to indicate authentication failure
          // The error details can be handled by the login form
          return null;
        }
      },
    }),
  ],

  // === EVENT HANDLERS ===
  events: {
    // Handle sign out - clean up external API sessions
    async signOut() {
      try {
        // Call the external Chat API logout endpoint
        console.log('[SIGNOUT_EVENT] Logging out from Chat API...');
        await ChatApi.logout();
      } catch (error) {
        // Log the error but don't block the main sign-out flow
        // The user should still be signed out of next-auth even if
        // the external API logout fails
        console.error('[CHAT_API_LOGOUT_ERROR]', error);
      }
    },
  },

  // === CALLBACK FUNCTIONS ===
  callbacks: {
    // JWT Callback - runs whenever a JWT is created/updated
    // This is where we handle token persistence and external API integration
    async jwt(callbackData) {
      const { token, user, account } = callbackData;

      console.log('callbackData', callbackData);

      // --- USER SIGN-IN LOGIC ---
      // This runs when a user first signs in (user object is present)
      if (user) {
        // Always persist the user's ID to the token
        token.id = user.id;

        if (
          account?.provider &&
          ['google', 'kakao', 'naver'].includes(account.provider) &&
          user.email
        ) {
          // console.log(
          //   `[AUTH_${account.provider.toUpperCase()}_LOGIN]`,
          //   callbackData
          // );
          try {
            if (account.provider === 'kakao' || account.provider === 'naver') {
              // console.log(`[AUTH_${account.provider.toUpperCase()}_LOGIN]`, {
              //   userId: user.id,
              //   email: user.email,
              //   provider: account.provider,
              //   providerAccountId: account.providerAccountId,
              // });
            }
          } catch (error) {
            console.error(
              `[AUTH_${account?.provider?.toUpperCase()}_TOKEN_ERROR]`,
              error
            );
            // If we can't get a token from the Chat API for an OAuth user,
            // we invalidate the session by returning an empty token,
            // which will force a sign-out
            return {};
          }
        }
      }

      return token;
    },

    // Session Callback - shapes the session object available to the client
    // This runs whenever a session is checked (useSession, getSession, etc.)
    session({ session, token }) {
      // Expose user ID in the session
      if (session.user) {
        session.user.id = token.id as string;
      }

      // Expose Chat API token in the session for client-side use
      // This allows client components to make authenticated requests
      // to our internal API routes, which can then use this token
      // to call the external Chat API
      if (token.chatApiToken) {
        session.chatApiToken = token.chatApiToken as string;
      }

      return session;
    },
  },
});
