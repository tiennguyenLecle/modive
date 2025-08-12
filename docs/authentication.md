# Authentication in Modive

This document outlines the authentication and session management architecture for the Modive application, built upon Supabase Auth, with clear separation for User and Admin roles.

## Table of Contents

- [Core Technology](#core-technology)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Supabase Factories](#supabase-factories)
  - [Callback Routes](#callback-routes)
- [Session Management](#session-management)
  - [Client-Side: `useAuth()`](#client-side-useauth)
  - [Middleware Sync](#middleware-sync)
- [Authentication Providers](#authentication-providers)
  - [Google, Kakao, Naver](#google-kakao-naver)
- [Protecting API Routes](#protecting-api-routes)
  - [The `withAuth` HOF](#the-withauth-hof)
  - [Usage with `pipe`](#usage-with-pipe)
- [Cookie Details](#cookie-details)

---

## Core Technology

We use **Supabase Auth** with `@supabase/supabase-js` and `@supabase/ssr`.

- OAuth flow (e.g., Google/Kakao): browser is redirected to our callback at `/api/auth/[role]/callback` where we exchange the authorization code and set cookies.
- Credentials flow (email/password): `supabase.auth.signInWithPassword()` returns the session directly on the client, which is then persisted by the SDK as cookies.

## Configuration

Key locations:

- Callback routes: `src/app/api/auth/[role]/callback/route.ts` (role: `'user' | 'admin'`)
- Client auth context: `src/lib/authentication/auth-context.tsx` (`useAuth`) – supports `role` to distinguish User/Admin flows
- Supabase factories:
  - Browser: `src/lib/supabase/factory.ts` → `createBrowserSupabase(role)`
  - Server: `src/lib/supabase/factory.server.ts` → `createServerSupabase(role, cookiesAdapter?)`
    - `cookiesAdapter` is optional; by default, it uses `next/headers` cookies store
- Middleware helpers: `src/lib/supabase/middleware.ts` (`updateSession`, `updateAdminSession`)

### Environment Variables

Stored in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Provider secrets are configured in Supabase Dashboard (Auth > Providers)

## Session Management

Supabase provides session access on both the server and client via SDKs.

### Client-Side: `useAuth()`

In Client Components (`'use client'`), use `useAuth()` from `src/lib/authentication/auth-context.tsx`.

- OAuth: `signInWithProvider(provider, redirect?)`
- Credentials: `signInWithCredential(email, password, redirect?)`
- Logout: `signOut()` (calls server logout route to clear cookies and redirect)

### Middleware Sync

`src/lib/supabase/middleware.ts` will:

- Always refresh User session via `updateSession`
- Refresh Admin session via `updateAdminSession` only for CMS paths
- Perform route gating for public/auth/protected areas

## Authentication Providers

We support various OAuth providers.

### Google, Kakao, Naver

- Enable providers in Supabase Dashboard (Auth > Providers)
- Add redirect URL pattern: `http://localhost:3000/api/auth/[role]/callback` (dev) and production domain.
- Select appropriate `role` (`user` or `admin`) at runtime in the `AuthProvider` based on the UI context.

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

For request validators (params/query/body), see the separate guide: `docs/api-validators.md`.

## Cookie Details

Supabase stores auth session in chunked cookies:

- User: COOKIE_PREFIX_SB
- Admin: COOKIE_PREFIX_SB_ADMIN

We set the prefix via `cookieOptions.name` when creating Supabase clients (browser/server/middleware).
Do not decode cookies manually; use the SDK and provided helpers.
