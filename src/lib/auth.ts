import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { ChatApi } from '@/lib/api/server';
import { COOKIE_PREFIX } from '@/utils/constants';

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
    async jwt({ token, user, account }) {
      // --- USER SIGN-IN LOGIC ---
      // This runs when a user first signs in (user object is present)
      if (user) {
        // Always persist the user's ID to the token
        token.id = user.id;

        // CASE 1: Credentials Provider (email/password)
        // The user object from authorize() already contains the chatApiToken
        if ((user as ExtendedUser).chatApiToken) {
          token.chatApiToken = (user as ExtendedUser).chatApiToken;
        }

        // CASE 2: OAuth Provider (e.g., Google)
        // We need to call our Chat API to get a token for this OAuth user
        if (account?.provider === 'google' && user.email) {
          // TODO: [AUTH-SSO] The current implementation for OAuth login is a placeholder
          // and uses hardcoded credentials for the Chat API. This is INSECURE for production.
          //
          // Recommended Action:
          // 1. Discuss with the Chat API development team to implement a secure
          //    SSO (Single Sign-On) endpoint.
          // 2. This new endpoint should accept an `id_token` or `access_token` from Google.
          // 3. The Chat API backend must validate this token with Google to verify its authenticity.
          // 4. Upon successful validation, the Chat API should create a user session and
          //    return its own `accessToken`.
          //
          // Example of the ideal call:
          // const { accessToken } = await ChatApi.loginWithGoogle(account.id_token);
          // token.chatApiToken = accessToken;
          try {
            // NOTE: This assumes your Chat API can issue tokens for OAuth users
            // You might need a separate endpoint like /auth/sso/google
            // or a way to register/authenticate OAuth users automatically
            const loginResponse = await ChatApi.login(
              'tien3107@yopmail.com', // user.email in Chat System
              'Tien3107@' // user.password in Chat System
            );

            token.chatApiToken = loginResponse.data.accessToken;
          } catch (error) {
            console.error('[AUTH_OAUTH_TOKEN_ERROR]', error);
            // If we can't get a token from the Chat API for an OAuth user,
            // we invalidate the session by returning an empty token,
            // which will force a sign-out
            return {};
          }
        }
      }

      // --- TOKEN REFRESH LOGIC ---
      // Here you could add logic to refresh expired tokens
      // For example, check if the chatApiToken is expired and refresh it

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
