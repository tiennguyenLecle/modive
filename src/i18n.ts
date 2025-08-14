import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from './lib/locale';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a promise that resolves to the locale of the request.
  // This is the recommended way to get the locale in `getRequestConfig`.
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid, falling back to the default
  // if it's not. This is safer than calling notFound() directly,
  // especially for cases like search engine bots or crawlers.
  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
  };
});
