'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import { ArrowRight, Cart } from '@/assets/icons';
import Button from '@/components/Button';
import { useRouter } from '@/lib/navigation';
import { fetchOrderById } from '@/lib/supabase/swr/order';
import { ROUTES } from '@/utils/constants';
import { formatDateOrTime } from '@/utils/formatTime';

import ProductInformation from '../../_components/ProductInformation.Client';
import { mappedCartItems } from '../../../shopping-cart/_components/utils';
import InfoList from '../../success/_components/InfoList.Client';
import { paymentInfoList, shippingInfoList } from '../../success/page';
import FAQ from './FAQ.Client';

const ORDER_KEY = {
  detail: (id: string) => ['order', id],
};

export default function OrderDetail({ id }: { id: string }) {
  const t = useTranslations('ordering');
  const router = useRouter();

  const { data, error } = useSWR(
    ORDER_KEY.detail(id),
    id ? () => fetchOrderById(id) : null
  );

  useEffect(() => {
    if (error || (data && !data?.id)) {
      router.push(ROUTES.GOODS);
    }
  }, [error, data]);

  const { created_at, status } = data || {};

  const items = mappedCartItems(data?.items || [], false, true, false);

  const handleCancelReception = (id: string) => {
    console.log(id);
  };

  return (
    <>
      {data && (
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
              {t('order_detail_title')}
            </h1>
          </div>
          <div className="relative flex max-h-[calc(100dvh-56rem)] flex-col gap-8 overflow-y-auto overflow-x-hidden bg-gray-90">
            <div>
              <div className="flex flex-row items-center justify-between gap-8 bg-white p-16 text-14 text-gray-30">
                <span className="max-w-[50%] truncate">
                  {t('order_number')}: {id}
                </span>
                <span className="max-w-[50%] truncate">
                  {formatDateOrTime(created_at || '', 'date')}
                </span>
              </div>
              <ProductInformation
                items={items.map(item => ({
                  ...item,
                  children: (
                    <Button
                      className="!w-fit max-w-full"
                      variant="secondary"
                      onClick={() => handleCancelReception(item?.id)}
                    >
                      {t('cancel_reception_btn')}
                    </Button>
                  ),
                }))}
                title={status || ''}
              />
            </div>
            <FAQ />
            <InfoList
              title={t('payment_information')}
              infoList={paymentInfoList(data, t)}
            />
            <InfoList
              title={t('shipping_information')}
              infoList={shippingInfoList(data?.shipping_info, t)}
            >
              <div className="px-24 pb-16 text-12 text-gray-50">
                *{t('noti_01')}
              </div>
            </InfoList>
          </div>
        </>
      )}
    </>
  );
}
