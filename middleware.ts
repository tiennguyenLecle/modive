/**
 * Next.js Middleware - Central request processing hub
 *
 * This middleware handles multiple concerns in a specific order:
 * 1. Internationalization (i18n) - Locale detection and routing
 * 2. Server Components support - Header injection for server-side locale access
 * 3. Authentication - Supabase session management
 *
 * Order of execution is critical - i18n redirects must happen first,
 * then header modifications, then auth processing.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { i18n } from './i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

/**
 * Main middleware function - processes ALL requests to the application
 *
 * Execution order:
 * 1. i18n: Check if URL has locale prefix, redirect if missing
 * 2. Headers: Add pathname to headers for Server Components
 * 3. Auth: Process Supabase session (may return redirect responses)
 * 4. Continue: Pass request with modified headers to the app
 *
 * @param request - The incoming request object
 * @returns NextResponse - Either a redirect, or modified request to continue
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ========================================
  // STEP 1: INTERNATIONALIZATION HANDLING
  // ========================================

  /**
   * Check if the pathname is missing a locale prefix
   *
   * Examples:
   * - "/about" → missing locale (needs redirect)
   * - "/en/about" → has locale (continue)
   * - "/kr" → has locale (continue)
   */
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If locale is missing, detect user's preferred locale and redirect
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to the same path with locale prefix
    // Example: "/about" → "/en/about"
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // ========================================
  // STEP 2: SERVER COMPONENTS SUPPORT
  // ========================================

  /**
   * Add pathname to request headers for Server Components
   *
   * This allows Server Components to access the current pathname
   * without relying on client-side hooks, supporting our server-first approach.
   *
   * Note: Currently not actively used, but available for future server-side
   * locale detection if needed. Our current approach uses params directly.
   */
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // ========================================
  // STEP 3: AUTHENTICATION & SESSION MANAGEMENT
  // ========================================

  /**
   * Process Supabase session management
   *
   * This may return:
   * - null/undefined: Continue normally
   * - NextResponse: Redirect to login, refresh tokens, etc.
   */
  const response = await updateSession(request);

  // If auth middleware wants to redirect/respond, respect that
  if (response) {
    // Important: Auth redirects take precedence over our header modifications
    return response;
  }

  // ========================================
  // STEP 4: CONTINUE WITH MODIFIED REQUEST
  // ========================================

  /**
   * Continue request processing with our modified headers
   *
   * The app will receive the request with:
   * - Original request data
   * - Additional x-pathname header for Server Components
   */
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * Middleware configuration - defines which routes this middleware should process
 *
 * The matcher uses a negative lookahead regex to EXCLUDE certain paths:
 * - api: API routes (handled separately, no i18n needed)
 * - _next/static: Next.js static assets (CSS, JS files)
 * - _next/image: Next.js Image Optimization API
 * - .*\\..*: Files with extensions (images, fonts, etc.)
 * - favicon.ico: Browser favicon requests
 *
 * This means middleware will run on:
 * ✅ / (root)
 * ✅ /about (pages)
 * ✅ /en/products (localized pages)
 * ❌ /api/users (API routes)
 * ❌ /_next/static/css/app.css (static assets)
 * ❌ /images/logo.png (static files)
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - files with extensions (.*\\..*)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)',
  ],
};

/**
 * Detects the user's preferred locale from browser headers
 *
 * Uses the Accept-Language header to determine the best locale match
 * from our supported locales. Falls back to default locale if no match.
 *
 * @param request - The incoming Next.js request object
 * @returns The best matching locale string (e.g., 'en', 'kr') or undefined
 *
 * @example
 * // Browser sends: Accept-Language: en-US,en;q=0.9,ko;q=0.8
 * // Returns: 'en' (if 'en' is in our supported locales)
 */
function getLocale(request: NextRequest): string | undefined {
  // Convert Next.js Headers to plain object for Negotiator
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Get our configured supported locales from i18n config
  const locales = i18n.locales;

  // Parse Accept-Language header and extract language preferences
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // Find the best match between user preferences and our supported locales
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}
