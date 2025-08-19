import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const DEFAULT_LANGUAGE = 'ko';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = DEFAULT_LANGUAGE;
  const getLocalFromCookie = cookies()?.get('NEXT_LOCALE')?.value;

  locale = getLocalFromCookie || DEFAULT_LANGUAGE;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
