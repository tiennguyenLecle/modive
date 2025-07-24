/**
 * Next.js Middleware - Central request processing hub with next-intl
 *
 * This middleware handles multiple concerns in a specific order:
 * 1. Internationalization (i18n) - next-intl locale detection and routing
 * 2. Authentication - Supabase session management
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import {
  COOKIE_LOCALE_NAME,
  DEFAULT_LOCALE,
  detectPreferredLocale,
  LOCALE_COOKIE_CONFIG,
  SUPPORTED_LOCALES,
} from '@/lib/locale';
import { updateSession } from '@/utils/supabase/middleware';

const intlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // Always show locale in URL
});

/**
 * Main middleware function - processes ALL requests to the application
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('[MIDDLEWARE] === START ===');
  console.log('[MIDDLEWARE] Processing path:', pathname);

  // 1. Locale detection, redirection, and cookie setting for the root path
  if (pathname === '/') {
    const savedLocale = request.cookies.get(COOKIE_LOCALE_NAME)?.value;
    const acceptLanguage = request.headers.get('Accept-Language') || '';
    const preferredLocale = detectPreferredLocale(savedLocale, acceptLanguage);

    console.log(
      `[MIDDLEWARE] Root access detected. Redirecting to /${preferredLocale} and setting cookie.`
    );

    // Create a response to redirect to the preferred locale
    const response = NextResponse.redirect(
      new URL(`/${preferredLocale}`, request.url)
    );

    // Set the cookie for future visits, using our centralized config
    response.cookies.set(
      COOKIE_LOCALE_NAME,
      preferredLocale,
      LOCALE_COOKIE_CONFIG
    );

    return response;
  }

  // 2. Internationalization - This returns a response with locale information
  console.log('[MIDDLEWARE] Calling intlMiddleware...');
  const response = intlMiddleware(request);
  console.log('[MIDDLEWARE] IntlMiddleware processed');

  // If intl middleware returns a redirect, let it happen immediately
  if (response.headers.get('location')) {
    console.log(
      '[MIDDLEWARE] Intl middleware redirect to:',
      response.headers.get('location')
    );
    return response;
  }

  // 3. Authentication - Pass the response from intl to Supabase
  // This ensures the locale context is not lost.
  console.log('[MIDDLEWARE] Calling auth middleware...');
  const authResponse = await updateSession(request, response);
  console.log('[MIDDLEWARE] Auth middleware processed');

  // The `updateSession` now returns the modified response.
  return authResponse;
}

export const config = {
  // Matcher to run middleware on all paths except for specific assets.
  // This new matcher prevents i18n routing from interfering with static files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
