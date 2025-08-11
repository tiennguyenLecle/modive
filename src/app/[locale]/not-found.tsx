import { getTranslations } from 'next-intl/server';

import { Link } from '@/lib/navigation';

export default async function NotFound() {
  const t = await getTranslations('notfound_page');

  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-lg">{t('description')}</p>
      <Link href="/" className="hover:text-primary">
        {t('back_home')}
      </Link>
    </main>
  );
}
