import { useTranslations } from 'next-intl';

import { Check } from '@/assets/icons';
import { Header } from '@/components';

import PaymentSuccessClient from './PaymentSuccess.client';

export default function SuccessPage() {
  const t = useTranslations('payments.success');

  return (
    <>
      <Header
        pageTitle={t('page_title')}
        showBackButton
        className="border-b border-gray-80"
      />
      <main
        data-no-navigation
        className="flex flex-col items-stretch justify-between gap-24 p-16 text-center"
      >
        <div></div>
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full mb-24 flex size-80 items-center justify-center overflow-hidden rounded-max bg-primary">
            <Check className="h-46 w-46 text-white" />
          </div>
          <h1 className="text-22 font-semibold">{t('title')}</h1>
        </div>

        <PaymentSuccessClient />
      </main>
    </>
  );
}
