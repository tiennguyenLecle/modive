import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './lib/locale';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a promise that resolves to the locale of the request.
  // This is the recommended way to get the locale in `getRequestConfig`.
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid, falling back to the default
  // if it's not. This is safer than calling notFound() directly,
  // especially for cases like search engine bots or crawlers.
  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    console.warn(
      `[i18n] Invalid or missing locale found: "${locale}". Falling back to default locale '${DEFAULT_LOCALE}'.`
    );
    locale = DEFAULT_LOCALE;
  }

  console.log(`[i18n] Loading messages for locale: ${locale}`);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
