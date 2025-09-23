'use client';

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { CartItemProps } from '@/atoms/goodsAtom';
import Empty from '@/components/Empty';
import { useAuth } from '@/lib/authentication/auth-context';
import { fetchOrderById } from '@/lib/supabase/swr/order';
import { confirmPayment } from '@/lib/supabase/swr/payment';
import { ROUTES } from '@/utils/constants';

import { mappedCartItems } from '../../shopping-cart/_components/utils';
import Success from './_components/Success.Client';

const ORDER_KEY = {
  detail: (orderId: string) => ['order', orderId],
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const paymentKey = searchParams.get('paymentKey') || '';
  const amount = searchParams.get('amount') || '';

  const [status, setStatus] = useState<string>('');

  const t = useTranslations('ordering');

  const { data, error } = useSWR(
    ORDER_KEY.detail(orderId),
    orderId ? () => fetchOrderById(orderId) : null
  );

  useEffect(() => {
    setStatus(data?.status || '');
  }, [data]);

  const handleConfirmPayment = async () => {
    if (!orderId || !paymentKey || !amount) {
      notification.error({
        message: 'Invalid orderId, paymentKey, or amount',
      });
      return;
    }

    const { data, error } = await confirmPayment({
      order_id: orderId,
      payment_key: paymentKey,
      amount: amount,
    });

    if (error) {
      notification.error({
        message: error,
      });
      return;
    }
    setStatus(data?.status);
  };

  useEffect(() => {
    handleConfirmPayment();
  }, []);

  if (!data) {
    return (
      <Empty description={t('order_not_found')}>
        <Link href={ROUTES.GOODS} className="mt-16 text-primary underline">
          {t('back_to_goods')}
        </Link>
      </Empty>
    );
  }

  const { shipping_info, items } = data || {};

  const orderItems = mappedCartItems(
    items || [],
    false,
    true,
    false
  ) as CartItemProps[];

  const paymentInfoList = [
    {
      label: t('payment_method'),
      value: data?.payment_method,
    },
    {
      label: t('order_status'),
      value: data?.status,
    },
    {
      label: t('order'),
      value: data?.created_at
        ? dayjs(data?.created_at).format('YYYY-MM-DD hh:mm')
        : '',
    },
    {
      label: t('payment_date'),
      value: data?.paid_at
        ? dayjs(data?.paid_at).format('YYYY-MM-DD hh:mm')
        : '',
    },
    {
      label: t('delivery_fee'),
      value: `${data?.total_delivery_fee ? (data?.total_delivery_fee as number)?.toLocaleString() : ''}${t('won')}`,
    },
    {
      label: t('payment_amount'),
      value: `${data?.total ? (data?.total as number)?.toLocaleString() : ''}${t('won')}`,
    },
  ];

  const shippingInfoList = [
    {
      label: t('conferee'),
      value: shipping_info?.receiver_name,
    },
    {
      label: t('phone_number'),
      value: shipping_info?.phone_number,
    },
    {
      label: t('address'),
      value: shipping_info?.address,
    },
    {
      label: t('delivery_request'),
      value: shipping_info?.note,
    },
  ];

  console.log('status:', status);

  return (
    <div data-no-navigation>
      <Success
        orderItems={orderItems as CartItemProps[]}
        paymentInfoList={paymentInfoList}
        shippingInfoList={shippingInfoList}
        orderId={orderId}
        status={status}
        scheduledDateInfo={items
          ?.filter(item => item.good?.release_date && item.good?.is_pre_sale)
          .map(item => item.good?.release_date || '')}
      />
    </div>
  );
}
