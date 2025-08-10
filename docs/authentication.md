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
  - [Validation HOFs (Params/Query/Body)](#validation-hofs-paramsquerybody)
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

### Validation HOFs (Params/Query/Body)

We provide Higher-Order Functions (HOFs) to validate different parts of an HTTP request using Zod. See implementation in `src/lib/api/middleware/validators.ts`.

- `withValidatedParams(schema)`
  - Source: `context.params` from Next.js App Router dynamic segments.
  - Example: `api/chat/123` → `{ chatroomId: '123' }`
  - On success, attaches parsed data to `context.validatedParams`.
  - Typical use: validate IDs, slugs from URL path.

- `withValidatedQuery(schema)`
  - Source: `request.nextUrl.searchParams` converted to an object of strings via `Object.fromEntries(...)`. (e.g., `api/`)
  - Example: `api/chat/123?limit=10&direction=after` → `{ limit: '10', direction: 'after' }`
  - On success, attaches parsed data to `context.validatedQuery`.
  - Tip: Use `z.coerce.number()` or refinements to convert string query values to the desired types.

- `withValidatedBody(schema)`
  - Source: `await request.json()` (expects a valid JSON body).
  - Example: `api/chat/123` with body `{ message: 'Hello, world!' }` → `{ message: 'Hello, world!' }`
  - On success, attaches parsed data to `context.validatedBody`.
  - Note: The request body stream is consumed here; do not call `request.json()` again in the handler.

Type inference: you can infer types in handlers with `z.infer<typeof schema>`.

Examples

```ts
// src/app/api/posts/[postId]/route.ts
import { z } from 'zod';

import { withAuth } from '@/lib/api/middleware/auth';
import {
  pipe,
  withValidatedBody,
  withValidatedParams,
  withValidatedQuery,
  type ApiHandler,
} from '@/lib/api/middleware/validators';

const paramsSchema = z.object({
  postId: z.string().min(1),
});

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  q: z.string().optional(),
});

const createBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type Params = z.infer<typeof paramsSchema>;
type Query = z.infer<typeof querySchema>;
type CreateBody = z.infer<typeof createBodySchema>;

const getHandler: ApiHandler = async (request, context) => {
  const userId = context.user!.id;
  const { postId } = context.validatedParams as Params;
  const { page, q } = context.validatedQuery as Query;
  // ... fetch and return post or related resources
  return new Response(JSON.stringify({ userId, postId, page, q }), {
    headers: { 'content-type': 'application/json' },
  });
};

const postHandler: ApiHandler = async (request, context) => {
  const { title, content } = context.validatedBody as CreateBody;
  // ... create resource
  return new Response(JSON.stringify({ title, content }), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  });
};

export const GET = pipe(
  withAuth,
  withValidatedParams(paramsSchema),
  withValidatedQuery(querySchema)
)(getHandler);

export const POST = pipe(
  withAuth,
  withValidatedParams(paramsSchema),
  withValidatedBody(createBodySchema)
)(postHandler);
```

## Cookie Details

Supabase stores auth session in HTTP‑Only cookies (chunked): `${COOKIE_PREFIX_SB}.0`, `${COOKIE_PREFIX_SB}.1`.
We set the prefix via `cookieOptions.name` when creating server/client/middleware Supabase clients.
Do not decode cookies manually; use the SDK (`getServerAuth()` / `useAuth()`).
