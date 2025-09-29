'use client';

import { useTranslations } from 'next-intl';

import { BaselineError } from '@/assets/icons';
import { Button, Header } from '@/components';
import { useRouter } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

type FailPageProps = {
  params: { locale: string };
  searchParams: { code?: string; message?: string; orderId?: string };
};

export default function FailPage({ searchParams }: FailPageProps) {
  const t = useTranslations('payments.fail');
  const router = useRouter();

  return (
    <>
      <Header pageTitle={t('page_title')} showBackButton />
      <main
        data-no-navigation
        className="flex flex-col items-center justify-center gap-24 p-16 text-center"
      >
        <div></div>
        <div className="flex flex-col items-center justify-center gap-12">
          <BaselineError className="size-64 h-80 text-gray-70" />
          <h1 className="text-22 font-semibold">{t('title')}</h1>
          <p className="whitespace-pre-wrap text-16 font-normal text-gray-40">
            <span>{t('payment_was_not_processed_normally')}</span>
            <br />
            <span>{t('please_try_again')}</span>
          </p>
        </div>
      </main>
      <div className="flex w-full gap-12 p-16">
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            router.push(ROUTES.MANAGEMENT.MY_CASH);
          }}
        >
          {t('button.try_again')}
        </Button>
      </div>
    </>
  );
}
