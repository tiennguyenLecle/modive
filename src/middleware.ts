import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/locale';
import { updateSession } from '@/lib/supabase/middleware';

import { COOKIE_PREFIX_SB } from './utils/constants';

// === ROUTE CONFIGURATION ===
// Define different types of routes for authentication logic

// Public routes - accessible to everyone, regardless of authentication status
const publicRoutes = ['/', '/login', '/register'];

// Auth routes - only for unauthenticated users (redirected if already logged in)
const authRoutes = ['/login', '/register'];

// Protected routes - require authentication (redirected to login if not authenticated)
const protectedRoutes = ['/chat', '/profile'];

// === INTERNATIONALIZATION SETUP ===
// Create the next-intl middleware with our locale configuration
const intlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES, // ['en', 'ko']
  defaultLocale: DEFAULT_LOCALE, // 'en'
  localePrefix: 'always', // Always show locale in URL (e.g., /en/login, /ko/chat)
  localeDetection: true, // Enable automatic locale detection
  alternateLinks: false, // Disable hreflang links generation in middleware
});

// The middleware is wrapped with `auth` to handle authentication.
export default async function middleware(request: NextRequest) {
  // === STEP 1: HANDLE INTERNATIONALIZATION ===
  // First, let's get the response from the i18n middleware.
  let response = intlMiddleware(request);

  // If i18n middleware returns a redirect (e.g., adding missing locale),
  // return it immediately without further processing
  // Check for both redirect status codes and location header
  if (
    response.status === 307 ||
    response.status === 308 ||
    response.headers.get('location')
  ) {
    return response;
  }

  // === STEP 2: HANDLE AUTHENTICATION & AUTHORIZATION ===

  // Remove the locale prefix from pathname to get the "clean" route
  // Example: "/en/chat" → "/chat", "/ko/login" → "/login"
  const localeFreePathname =
    request.nextUrl.pathname.replace(
      new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})`),
      ''
    ) || '/';

  // Refresh Supabase session cookies and read user
  response = await updateSession(request, NextResponse.next());
  // Supabase @supabase/ssr đặt cookie auth dạng chunked với tiền tố tuỳ chỉnh.
  // Với cấu hình hiện tại (cookieOptions.name = 'modive-sb'), tên cookie sẽ là 'modive-sb.0', 'modive-sb.1'.
  const isLoggedIn = Boolean(
    response.cookies.get(`${COOKIE_PREFIX_SB}.0`)?.value
  );

  // Determine if the current route is public
  // A route is public if:
  // 1. It's explicitly in the publicRoutes array, OR
  // 2. It's not a protected route (fallback for undefined routes)
  const isPublicRoute =
    publicRoutes.some(
      route =>
        route === '/'
          ? localeFreePathname === route // Exact match for root route
          : localeFreePathname.startsWith(route) // Prefix match for other routes
    ) || !protectedRoutes.some(route => localeFreePathname.startsWith(route));

  // Check if this is an authentication-only route (login/register)
  const isAuthRoute = authRoutes.some(route =>
    localeFreePathname.startsWith(route)
  );

  // === AUTH ROUTE LOGIC ===
  // If user is on an auth route (login/register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Logged-in users shouldn't see login/register pages
      // Redirect them to the main application (home page)
      const locale = request.nextUrl.locale;
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    // Allow unauthenticated users to access auth routes
    return response;
  }

  // === PROTECTED ROUTE LOGIC ===
  // If user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    // Build the callback URL to redirect back after login
    const { search } = request.nextUrl;
    let callbackUrl = localeFreePathname;
    if (search) {
      callbackUrl += search; // Preserve query parameters
    }

    // Create login URL with callback parameter
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  // === FINAL STEP ===
  // If all authentication checks pass, return the i18n response
  return response;
}

// === MIDDLEWARE MATCHER CONFIGURATION ===
// Define which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) - IMPORTANT: API routes are excluded from this middleware
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - .well-known (metadata files)
     * - SEO files (robots.txt, sitemap.xml)
     * - All files with extensions (e.g., .ico, .png, .svg, .js)
     * - PWA files (site.webmanifest)
     *
     * This ensures that:
     * 1. API routes handle their own responses without i18n processing
     * 2. Static assets are served directly
     * 3. Only page routes go through authentication and i18n logic
     */
    '/((?!api|auth/callback|_next/static|_next/image|\\.well-known|robots\\.txt|sitemap\\.xml|.*\\.(?:ico|png|svg|js)$|site\\.webmanifest).*)',
  ],
};
