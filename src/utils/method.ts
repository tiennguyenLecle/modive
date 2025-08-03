export const cx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getTranslationKeyFromPathname = (
  pathname: string,
  locale: string
) => {
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  return pathWithoutLocale;
};
