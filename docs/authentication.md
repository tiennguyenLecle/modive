# Authentication in Modive

This document outlines the authentication and session management architecture for the Modive application, built upon Supabase Auth.

## Table of Contents

- [Core Technology](#core-technology)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Session Management](#session-management)
  - [Server-Side: `getServerAuth()`](#server-side-getserverauth)
  - [Client-Side: `useAuth()`](#client-side-useauth)
- [Authentication Providers](#authentication-providers)
  - [Google, Kakao, Naver](#google-kakao-naver)
- [Protecting API Routes](#protecting-api-routes)
  - [The `withAuth` HOF](#the-withauth-hof)
  - [Usage with `pipe`](#usage-with-pipe)
- [Cookie Details](#cookie-details)

---

## Core Technology

We use **Supabase Auth** with `@supabase/supabase-js` and `@supabase/ssr`.
The OAuth flow (e.g., Google) is handled by Supabase. Our app exchanges the authorization code at `/api/auth/callback` to set HTTP‑Only cookies for the app domain.

## Configuration

The core configuration lives in:

- `src/app/api/auth/callback/route.ts`: exchanges the OAuth code via `supabase.auth.exchangeCodeForSession(code)` and sets cookies
- `src/lib/auth-context.tsx`: client auth context (`useAuth`) reading Supabase session
- `src/lib/server-auth.ts`: server helper `getServerAuth()` to read session on the server
- `src/lib/supabase/{client,server,middleware}.ts`: Supabase clients and middleware helper

### Environment Variables

Stored in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Provider secrets are configured in Supabase Dashboard (Auth > Providers)

## Session Management

Supabase provides session access on both the server and client via SDKs.

### Server-Side: `getServerAuth()`

Use `getServerAuth()` from `src/lib/server-auth.ts` in Server Components, API Routes, and server logic.

```ts
import { getServerAuth } from '@/lib/server-auth';

const { status, user, session } = await getServerAuth();
if (status !== 'authenticated') {
  // redirect or return 401
}
```

### Client-Side: `useAuth()`

In Client Components (`'use client'`), use `useAuth()` from `src/lib/auth-context.tsx`.

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';

function AuthButton() {
  const { status, user, signInWithProvider, signOut } = useAuth();
  if (status === 'loading') return null;
  if (status === 'authenticated') {
    return (
      <div>
        {user?.email}
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }
  return (
    <button onClick={() => signInWithProvider('google')}>
      Sign in with Google
    </button>
  );
}
```

## Authentication Providers

We support various OAuth providers.

### Google, Kakao, Naver

- Enable providers in Supabase Dashboard (Auth > Providers)
- Add redirect URL: `http://localhost:3000/api/auth/callback` (dev) and production domain.

## Protecting API Routes

Our API routes (`src/app/api/`) are protected to ensure only authenticated users can access them.

### The `withAuth` HOF

- **Location:** `src/lib/api/middleware/auth.ts`
- **Functionality:** This HOF wraps an API handler. It first tries to decode the access token from cookies, then falls back to `getServerAuth()` to refresh/read user. If no user, returns 401; else attaches to `context.session.user`.

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

## Cookie Details

Supabase stores auth session in HTTP‑Only cookies (chunked): `${COOKIE_PREFIX_SB}.0`, `${COOKIE_PREFIX_SB}.1`.
We set the prefix via `cookieOptions.name` when creating server/client/middleware Supabase clients.
Do not decode cookies manually; use the SDK (`getServerAuth()` / `useAuth()`).
