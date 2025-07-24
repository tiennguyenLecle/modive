/**
 * Comprehensive locale management utilities
 */

// ==================== CONSTANTS ====================

// Supported locales in our app
export const SUPPORTED_LOCALES = ['en', 'kr'] as const;
export const DEFAULT_LOCALE = 'en';

// Cookie configuration với COOKIE_ prefix
export const COOKIE_LOCALE_NAME = 'preferred-locale';
export const COOKIE_LOCALE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

// Cookie configuration object (constant for performance)
export const LOCALE_COOKIE_CONFIG = {
  maxAge: COOKIE_LOCALE_MAX_AGE,
  httpOnly: false, // Allow client-side access for locale switcher
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/**
 * Maps internal locale identifiers to standard RFC 5646 language tags
 * for use in SEO and internationalization contexts (e.g., HTML lang attribute, Schema).
 */
export const LOCALE_TO_RFC5646: Record<string, string> = {
  en: 'en-US',
  kr: 'ko-KR',
};

// Locale mapping từ standard Accept-Language codes to our app codes
export const LOCALE_MAPPING: Record<string, string> = {
  ko: 'kr', // Korean: ko-KR, ko -> kr
  kr: 'kr', // Korean: direct mapping
  en: 'en', // English: en-US, en -> en
};

// ==================== TYPES ====================

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// ==================== UTILITY FUNCTIONS ====================

/**
 * Type guard to check if a string is a valid locale
 * @param locale - String to check
 * @returns True if locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Parses Accept-Language header to find best matching locale
 * @param acceptLanguage - Accept-Language header value
 * @param supportedLocales - Array of supported locale codes in our app
 * @returns Best matching locale or null
 */
export function parseAcceptLanguage(
  acceptLanguage: string,
  supportedLocales: readonly string[] = SUPPORTED_LOCALES
): string | null {
  if (!acceptLanguage) return null;

  // Parse and sort by quality factor
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1]) || 1;
      return { code: code.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first match (exact or language family)
  for (const { code } of languages) {
    // Check direct mapping first
    const mappedCode = LOCALE_MAPPING[code];
    if (mappedCode && supportedLocales.includes(mappedCode)) {
      return mappedCode;
    }

    // Language family match (e.g., 'ko-KR' -> 'ko' -> 'kr')
    const languageCode = code.split('-')[0];
    const mappedLanguageCode = LOCALE_MAPPING[languageCode];
    if (mappedLanguageCode && supportedLocales.includes(mappedLanguageCode)) {
      return mappedLanguageCode;
    }
  }

  return null;
}

/**
 * Detects preferred locale from request
 * Priority: Cookie > Accept-Language Header > Default
 * @param savedLocale - Locale from cookie (if any)
 * @param acceptLanguage - Accept-Language header value
 * @returns Detected locale
 */
export function detectPreferredLocale(
  savedLocale: string | undefined,
  acceptLanguage: string
): Locale {
  // 1. Check saved cookie preference first
  if (savedLocale && isValidLocale(savedLocale)) {
    return savedLocale;
  }

  // 2. Parse Accept-Language header
  const detectedLocale = parseAcceptLanguage(acceptLanguage);

  // 3. Use detected locale or fallback to default
  return (detectedLocale as Locale) || DEFAULT_LOCALE;
}
