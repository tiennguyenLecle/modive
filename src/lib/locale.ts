/**
 * Comprehensive locale management utilities
 */

// ==================== CONSTANTS ====================

// Supported locales in our app
export const SUPPORTED_LOCALES = ['en', 'ko'] as const;
export const DEFAULT_LOCALE = 'en';

/**
 * Maps internal locale identifiers to standard RFC 5646 language tags
 * for use in SEO and internationalization contexts (e.g., HTML lang attribute, Schema).
 */
export const LOCALE_TO_RFC5646: Record<string, string> = {
  en: 'en-US',
  ko: 'ko-KR',
};

// ==================== TYPES ====================

export type Locale = (typeof SUPPORTED_LOCALES)[number];
