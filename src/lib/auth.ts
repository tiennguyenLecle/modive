import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    // This is a placeholder for development.
    // You will add Google and Kakao providers here.
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
