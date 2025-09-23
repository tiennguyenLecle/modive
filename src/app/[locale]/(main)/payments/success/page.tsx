import { useTranslations } from 'next-intl';

import { Check } from '@/assets/icons';
import { Button, Header } from '@/components';
import { CASH_CHARGING_OPTIONS } from '@/utils/constants';

import PaymentSuccessClient from './PaymentSuccess.client';

type SuccessPageProps = {
  params: { locale: string };
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const t = useTranslations('payments.success');
  const { amount } = searchParams || {};

  const cash = CASH_CHARGING_OPTIONS.find(
    item => item.price === Number(amount)
  )?.cash;

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

        {amount && cash && (
          <div>
            <div className="h-1 bg-gray-80" />

            <div className="flex h-60 items-center justify-between px-16">
              <span className="text-16 font-semibold text-gray-00">
                {t('charging')}
              </span>
              <span className="text-22 font-semibold text-primary">
                {t('charging_amount', { value: amount?.toLocaleString() })}
              </span>
            </div>

            <div className="h-1 bg-gray-80" />

            <div className="flex justify-between p-16">
              <span className="text-14 text-gray-30">{t('cash_holding')}</span>
              <span className="text-16 font-semibold text-gray-00">
                {t('cash_amount', { value: cash?.toLocaleString() })}
              </span>
            </div>

            <div className="h-1 bg-gray-80" />
          </div>
        )}

        <div>
          <PaymentSuccessClient amount={Number(cash)} />
        </div>
      </main>
    </>
  );
}
