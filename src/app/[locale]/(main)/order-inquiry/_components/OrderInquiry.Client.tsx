'use client';

import { useTranslations } from 'next-intl';

import { ArrowRight } from '@/assets/icons';
import { useRouter } from '@/lib/navigation';

import OrderList from './OrderList.Client';

export default function OrderInquiry() {
  const router = useRouter();
  const t = useTranslations('ordering');

  return (
    <>
      <div className="container flex h-56 items-center gap-12 border-b border-t border-gray-80">
        <button
          className="h-24 w-24"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowRight className="rotate-180" />
        </button>
        <h1 className="flex-1 pr-36 text-center text-16 font-bold">
          {t('order_delivery_inquiry')}
        </h1>
      </div>
      <div className="relative flex max-h-[calc(100dvh-56rem)] flex-col gap-8 overflow-y-auto overflow-x-hidden bg-gray-90">
        <OrderList />
      </div>
    </>
  );
}
