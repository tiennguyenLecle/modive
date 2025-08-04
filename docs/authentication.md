# Authentication in Modive

This document outlines the authentication and session management architecture for the Modive application, built upon `next-auth` (Auth.js).

## Table of Contents

- [Core Technology](#core-technology)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Session Management](#session-management)
  - [Server-Side: `auth()`](#server-side-auth)
  - [Client-Side: `useSession()`](#client-side-usesession)
- [Authentication Providers](#authentication-providers)
  - [Google](#google)
  - [KakaoTalk (TODO)](#kakaotalk-todo)
- [Protecting API Routes](#protecting-api-routes)
  - [The `withAuth` HOF](#the-withauth-hof)
  - [Usage with `pipe`](#usage-with-pipe)
- [Callbacks and Token Management](#callbacks-and-token-management)
- [Cookie Details](#cookie-details)

---

## Core Technology

We use **`next-auth` v5 (Auth.js)**, which is tightly integrated with the Next.js App Router. This library handles the complexities of OAuth 2.0 flows, session management, and JWT handling.

## Configuration

The core configuration for `next-auth` resides in `src/lib/auth.ts`. This file exports the `auth` object and the route handlers (`GET`, `POST`) that are used in the catch-all API route `src/app/api/auth/[...nextauth]/route.ts`.

### Environment Variables

Secure credentials and configuration values are stored in `.env.local`.

- `AUTH_SECRET`: A **critical** secret key used to encrypt JWTs and sign cookies. It must be a long, random string (e.g., generated with `openssl rand -hex 32`). **NEVER** commit this to version control.
- `AUTH_URL`: The canonical URL of the application (e.g., `http://localhost:3000`).
- `GOOGLE_CLIENT_ID`: The client ID obtained from the Google Cloud Console for the OAuth application.
- `GOOGLE_CLIENT_SECRET`: The client secret obtained from the Google Cloud Console.

## Session Management

`next-auth` provides a unified way to access session data on both the server and the client.

### Server-Side: `auth()`

On the server (in Server Components, API Routes, middleware), we use the `auth()` function exported from `src/lib/auth.ts`.

- **How it works:** It directly reads and verifies the session cookie/JWT from the incoming request headers.
- **Usage:**

  ```typescript
  import { auth } from '@/lib/auth';

  async function MyServerComponent() {
    const session = await auth();
    if (!session?.user) {
      // Handle unauthenticated state, e.g., redirect
    }
    return <div>Welcome, {session.user.name}</div>;
  }
  ```

### Client-Side: `useSession()`

In Client Components (`'use client'`), we use the `useSession` hook from `next-auth/react`.

- **Prerequisite:** The application's root layout must be wrapped in a `<SessionProvider>`, which we handle in `src/app/providers.tsx`.
- **How it works:** This hook reads the session data from the React context provided by `SessionProvider`. It also handles automatic refetching and provides a `status` field (`'loading'`, `'authenticated'`, `'unauthenticated'`).
- **Usage:**

  ```typescript
  'use client';
  import { useSession, signIn } from 'next-auth/react';

  function AuthButton() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <p>Loading...</p>;
    if (session) {
      return <p>Signed in as {session.user.email}</p>;
    }
    return <button onClick={() => signIn('google')}>Sign in</button>;
  }
  ```

## Authentication Providers

We support various OAuth providers.

### Google

- **Status:** Implemented.
- **Configuration:** Uses `GoogleProvider` with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

### KakaoTalk (TODO)

- **Status:** Planned.
- **Action:** To implement, we will need to obtain credentials from the Kakao Developers portal and add the `KakaoProvider` to `src/lib/auth.ts`.

## Protecting API Routes

Our internal API routes (under `src/app/api/`) are protected to ensure only authenticated users can access them. We use a custom Higher-Order Function (HOF) for this.

### The `withAuth` HOF

- **Location:** `src/lib/api/middleware/auth.ts`
- **Functionality:** This HOF wraps an API handler. It calls `await auth()` internally. If no session is found, it immediately returns a `401 Unauthorized` error. If a session exists, it attaches the `session.user` object to the `context.user` and calls the original handler.

### Usage with `pipe`

We use our `pipe` utility to compose middleware for our API endpoints. `withAuth` should typically be the first function in the pipe.

```typescript
import { pipe, withAuth, withValidatedBody } from '@/lib/api/middleware';

async function myProtectedHandler(request, context) {
  // context.user is guaranteed to exist here
  const userId = context.user.id;
  // ... handler logic
}

export const POST = pipe(
  withAuth,
  withValidatedBody(mySchema)
)(myProtectedHandler);
```

## Callbacks and Token Management

We use the `callbacks` object in `src/lib/auth.ts` to customize the JWT and session objects.

- `jwt({ token, user })`: This callback is executed whenever a JWT is created or updated. We use it to persist the user's database ID (`user.id`) into the token (`token.id`).
- `session({ session, token })`: This callback is executed whenever a session is accessed on the client. We use it to transfer the `token.id` from the JWT into the `session.user` object, making the user ID available to client components via `useSession`.

## Cookie Details

`next-auth` handles cookie management automatically. By default, it creates a secure, `HttpOnly` session cookie. The name and options of the cookie can be customized in the `NextAuth` configuration if needed, but the defaults are generally recommended.
