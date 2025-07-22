import { useTranslations } from 'next-intl';

import ActiveLink from './ActiveLink';

export default function Navigation() {
  const t = useTranslations();

  return (
    <nav className="flex gap-8 p-4">
      <ActiveLink href="/">{t('Home')}</ActiveLink>
      <ActiveLink href="/animation">{t('Animation')}</ActiveLink>
      <ActiveLink href="/font-test">{t('Font')}</ActiveLink>
    </nav>
  );
}
