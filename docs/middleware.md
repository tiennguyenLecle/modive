# Middleware

This document outlines the functionality and configuration of the Next.js middleware used in this project. The middleware is responsible for handling internationalization (i18n) and authentication/authorization before a request is completed.

## File Location

- `src/middleware.ts`

## Core Responsibilities

1.  **Internationalization (i18n)**: Handled by `next-intl`. It automatically detects the user's preferred locale and redirects them to the appropriate URL path (e.g., `/en/...` or `/ko/...`).
2.  **Authentication & Authorization**: Handled by Supabase Auth. It protects routes and manages user sessions through HTTP‑Only cookies.

## Execution Flow

The middleware executes in a specific order for every incoming page request:

1.  **Session Refresh**: The middleware calls our Supabase helper `updateSession(request, response)` to refresh session cookies when needed. This ensures SSR/API see up‑to‑date auth state.

2.  **`next-intl` Middleware**:
    - It runs first to determine the correct locale for the request.
    - **Locale Detection**: It uses its built-in mechanism (`localeDetection: true`) to parse the `Accept-Language` header from the browser and also checks for a `modive.locale` cookie.
    - **Redirection**: If the URL is missing a locale prefix (e.g., a user visits `/login`), it performs a redirect to the detected locale's path (e.g., `/en/login`). This redirect is returned immediately, and no further middleware logic runs.

3.  **Authentication Logic**: If `next-intl` does not perform a redirect, the authentication logic proceeds:
    - The user's authentication status is checked by the presence of chunked auth cookie `${COOKIE_PREFIX_SB}.0` (configured via `cookieOptions.name`).
    - The current route is categorized as a `publicRoute`, `authRoute`, or `protectedRoute`.

4.  **Route Protection**:
    - **Auth Routes** (e.g., `/login`): If a logged-in user tries to access these pages, they are redirected to the application's home page (e.g., `/en`).
    - **Protected Routes** (e.g., `/chat`): If an unauthenticated user tries to access a protected route, they are redirected to the `/login` page. The original path they intended to visit is saved as a `callbackUrl` query parameter.
    - **Public Routes**: All users can access these routes without any redirection.

## Configuration (`matcher`)

The `config` object at the bottom of `src/middleware.ts` defines which paths the middleware should run on. It is configured to:

- **Run on all page routes.**
- **Exclude specific paths** to improve performance and prevent conflicts:
  - `/api/...` (API routes handle their own logic)
  - `/_next/static/...` (Static assets)
  - `/_next/image/...` (Image optimization files)
  - Static files like `favicon.ico`, `robots.txt`, etc.

This ensures that the middleware only processes relevant page requests, leaving API calls and static assets untouched.
