import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import 'antd/dist/reset.css';
import '@/styles/globals.css';
import { pretendard } from '@/styles/fonts';
import AntdRegistry from '@/lib/antd-registry';

export const metadata: Metadata = {
  title: 'Modive App',
  description: 'A modern multilingual app',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={pretendard.variable}>
      <body className="overflow-x-hidden relative">
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>{children}</AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
