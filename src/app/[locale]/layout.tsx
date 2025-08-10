import type { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

import { Providers } from '@/app/providers';
import { type Locale } from '@/lib/locale';
import { defaultMetadata, StructuredData } from '@/lib/seo';
import { nanumMyeongjo, pretendard } from '@/styles/fonts';

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations({
    namespace: 'default.metadata',
    locale: locale as Locale,
  });

  // Merge default metadata with page-specific, dynamic metadata
  return {
    ...defaultMetadata,
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    keywords: ['AI', 'chatbot', 'modern', 'multilingual', 'Korean', 'English'],
    openGraph: {
      ...defaultMetadata.openGraph,
      locale: locale,
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${pretendard.variable} ${nanumMyeongjo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="theme-color" content="#FF627B" />
        <meta name="color-scheme" content="light dark" />
        <StructuredData locale={locale} />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
