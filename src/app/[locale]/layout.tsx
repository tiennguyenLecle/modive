import type { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';

import '@/lib/chatbot-modules/dist/styles.css';
import '@/styles/variables.css';
import '@/styles/globals.css';

import AmplitudeSetup from '@/app/AmplitudeSetup';
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
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#FF627B" />
        <meta name="color-scheme" content="light dark" />
        <StructuredData locale={locale} />

        <Script
          id={'gtm'}
          strategy={'afterInteractive'}
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <AmplitudeSetup />

        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
