import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

import HomeHeader from '@/components/HomeHeader';
import Navigation from '@/components/Navigation/Navigation';
import AntdRegistry from '@/lib/antd-registry';
import { type Locale } from '@/lib/locale';
import { StructuredData } from '@/lib/seo';
import { ThemeRegistry } from '@/lib/theme-registry';
import { nanumMyeongjo, pretendard } from '@/styles/fonts';

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations({
    namespace: 'default.metadata',
    locale: locale as Locale,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    applicationName: 'Modive',
    authors: [{ name: 'Modive Team' }],
    generator: 'Next.js',
    keywords: ['AI', 'chatbot', 'modern', 'multilingual', 'Korean', 'English'],
    referrer: 'origin-when-cross-origin',
    creator: 'Modive Team',
    publisher: 'Modive',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        kr: '/kr',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: baseUrl,
      title: t('title'),
      description: t('description'),
      siteName: 'Modive',
      images: [
        {
          url: '/android-chrome-512x512.png',
          width: 512,
          height: 512,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/android-chrome-512x512.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Modive',
    },
  };
}

export default async function LocaleLayout({
  children,
  modal,
  params: { locale },
}: LayoutProps) {
  // Providing all messages to the client side is the easiest way to get started
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
        {/* The single, refactored StructuredData component is used here */}
        <StructuredData locale={locale} />
      </head>
      <body>
        <ThemeRegistry>
          <NextIntlClientProvider messages={messages}>
            <AntdRegistry>
              <div className="flex h-full flex-col overflow-auto">
                <HomeHeader />
                <div className="my-56">{children}</div>
                <Navigation className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100" />
              </div>
              {modal}
            </AntdRegistry>
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
