import { useTranslations } from 'next-intl';

import { Check } from '@/assets/icons';
import { Button, Header } from '@/components';

type SuccessPageProps = {
  params: { locale: string };
  searchParams: { paymentKey?: string; orderId?: string; amount?: string };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const t = useTranslations('payments.success');
  const { paymentKey, orderId, amount } = searchParams || {};

  return (
    <>
      <Header pageTitle={t('page_title')} showBackButton />
      <main
        data-no-navigation
        className="flex flex-col items-center justify-between gap-24 p-16 text-center"
      >
        <div></div>
        <div className="flex flex-col items-center justify-center gap-12">
          <Check className="size-64 h-80 text-primary" />
          <h1 className="text-22 font-semibold">{t('title')}</h1>
        </div>
        <div className="flex w-full gap-12 p-16">
          <Button variant="primary" className="flex-1">
            {t('button.check')}
          </Button>
        </div>
      </main>
    </>
  );
}
