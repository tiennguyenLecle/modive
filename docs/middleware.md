# Middleware Documentation (`src/middleware.ts`)

## Overview

The `src/middleware.ts` file acts as a central request processing hub for the entire application. It is executed on almost every incoming request before it reaches a page. Its primary responsibilities are handled in a specific, sequential order:

1.  **Internationalization (i18n)**: Manages locale detection, path-based routing (`/en`, `/kr`), and language-specific content delivery using `next-intl`.
2.  **Authentication**: Manages user sessions and authentication state using Supabase.

---

## Execution Logic: The `matcher`

The middleware does not run on _every_ single request. The `config.matcher` object at the bottom of the file defines which paths are **excluded** from middleware processing. This is a crucial performance optimization to prevent the middleware from running on requests for static assets or API routes.

The following paths are currently **ignored** by the middleware:

- `/api/**`: All API routes.
- `/_next/static/**`: Internal Next.js static files (JS, CSS).
- `/_next/image/**`: Next.js image optimization files.
- `/.well-known/**`: Standardized metadata files.
- `/robots.txt` & `/sitemap.xml`: SEO-related files.
- All files with a common asset extension (e.g., `.ico`, `.png`, `.svg`, `.js`). This includes favicons and service workers.
- `/site.webmanifest`: The PWA manifest file.

---

## Processing Flow

For any request that is _not_ excluded by the matcher, the `middleware` function executes the following steps in order:

### Step 1: Root Path Handling (First-Time Visitors)

- **Trigger**: A user accesses the root URL (`/`) for the first time.
- **Logic**:
  1.  It checks for a previously saved language preference in the `COOKIE_LOCALE_NAME` cookie.
  2.  If no cookie is found, it inspects the `Accept-Language` header from the user's browser to detect their preferred language.
  3.  It then **redirects** the user to the appropriate localized path (e.g., from `/` to `/en`).
  4.  Crucially, it **sets the language cookie** so that on subsequent visits, the user is taken directly to their preferred language path without this detection logic.

### Step 2: Internationalization (i18n) via `next-intl`

- **Trigger**: Any page request that is not the root path.
- **Logic**:
  1.  The request is passed to the `intlMiddleware` provided by `next-intl`.
  2.  This middleware is responsible for ensuring the URL format is correct. If a user accesses a path without a locale prefix (e.g., `/chat`), `intlMiddleware` will generate a redirect response to the correct, localized URL (e.g., `/en/chat`).
  3.  The main middleware function includes a critical **"early exit"** check. If it detects a `location` header in the response from `intlMiddleware`, it immediately returns that redirect response without proceeding to the next step. This is an efficient way to enforce correct URL structure.

### Step 3: Authentication via Supabase

- **Trigger**: If and only if the previous steps did not result in a redirect.
- **Logic**:
  1.  The request (along with the response from the i18n middleware) is passed to Supabase's `updateSession` function.
  2.  This function inspects the request for authentication cookies, validates the user's session, and refreshes the auth token if necessary.
  3.  It ensures that by the time the request reaches the server-side components of a page, the user's authentication state is up-to-date and available.

This sequential, step-by-step process ensures that URL structure and language are determined _before_ any authentication or page logic is executed, making the application robust and predictable.
