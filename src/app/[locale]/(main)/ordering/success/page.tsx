'use client';

import { useEffect, useRef, useState } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { notification } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { CartItemProps } from '@/atoms/goodsAtom';
import Empty from '@/components/Empty';
import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import {
  fetchOrderById,
  OrderResponseType,
  ShippingAddressType,
} from '@/lib/supabase/swr/order';
import { confirmPayment } from '@/lib/supabase/swr/payment';
import { getAmplitudeLocationProperties } from '@/utils/amplitude';
import { ROUTES } from '@/utils/constants';

import { mapOrderStatus } from '../../order-inquiry/utils';
import { mappedCartItems } from '../../shopping-cart/_components/utils';
import Success from './_components/Success.Client';

const ORDER_KEY = {
  detail: (orderId: string) => ['order', orderId],
};

export const paymentInfoList = (data: OrderResponseType, t: any) => {
  return [
    {
      label: t('payment_method'),
      value: data?.payment_method,
    },
    {
      label: t('order_status'),
      value: mapOrderStatus(data?.status, t),
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
};

export const shippingInfoList = (data: ShippingAddressType, t: any) => {
  return [
    {
      label: t('conferee'),
      value: data?.receiver_name,
    },
    {
      label: t('phone_number'),
      value: data?.phone_number,
    },
    {
      label: t('address'),
      value: data?.address,
    },
    {
      label: t('delivery_request'),
      value: data?.note,
    },
  ];
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const paymentKey = searchParams.get('paymentKey') || '';
  const amount = searchParams.get('amount') || '';

  const [status, setStatus] = useState<string>('');
  const { user } = useAuth();
  const hasTrackedPurchase = useRef(false);

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

    const { data: paymentData, error } = await confirmPayment({
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
    // Use status from the order data instead
    if (paymentData?.status) {
      setStatus(paymentData.status);
    }
  };

  const trackPurchaseEvent = async () => {
    try {
      if (!data || !data.items || data.items.length === 0) {
        return;
      }

      const supabase = createBrowserSupabase('user');

      // Check if this is the first purchase (exclude current order)
      const { data: previousOrders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user?.id)
        .eq('status', 'paid')
        .neq('id', orderId)
        .limit(1);

      const isFirstPurchase = !previousOrders || previousOrders.length === 0;
      const firstPurchaseText = isFirstPurchase ? '첫구매' : '재구매';

      // Payment method mapping
      const paymentMethodMap: Record<string, string> = {
        transfer: '퀵계좌이체',
        card: '신용/체크카드',
        kakaopay: '카카오페이',
        tosspay: '토스페이',
        payco: '페이코',
        virtual_account: '가상계좌',
      };

      // Track event for each product
      for (const item of data.items) {
        const good = item.good;

        if (!good) continue;

        // Fetch work information if work_id exists
        let workTitle = '';
        if (good.work_id) {
          try {
            const { data: work } = await supabase
              .from('works')
              .select('title')
              .eq('id', good.work_id)
              .single();
            workTitle = work?.title || '';
          } catch (error) {
            console.error('Failed to fetch work title:', error);
          }
        }

        const productPrice = good.price || 0;
        const productQuantity = item.quantity || 1;
        const revenue = productPrice * productQuantity;

        amplitude.track({
          event_type: 'Purchased',
          event_properties: {
            program_name: workTitle,
            product_id: good.id,
            product_name: good.title,
            product_price: productPrice,
            product_quantity: productQuantity,
            revenue: revenue,
            currency: data.currency?.toUpperCase() || 'KRW',
            first_purchase: firstPurchaseText,
            payment_method:
              paymentMethodMap[data.payment_method] || data.payment_method,
            'order id': orderId,
            ...getAmplitudeLocationProperties(),
          },
        });

        // Track revenue event
        const revenueEvent = new amplitude.Revenue()
          .setProductId(good.id)
          .setPrice(productPrice)
          .setQuantity(productQuantity);

        amplitude.revenue(revenueEvent);
      }
    } catch (error) {
      console.error('Failed to track Purchased event:', error);
    }
  };

  useEffect(() => {
    handleConfirmPayment();
  }, []);

  // Track purchase event when status becomes 'paid' or 'confirmed' and data is available
  useEffect(() => {
    if (
      (status === 'paid' || status === 'confirmed') &&
      data &&
      !hasTrackedPurchase.current
    ) {
      hasTrackedPurchase.current = true;
      trackPurchaseEvent();
    }
  }, [status, data]);

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

  return (
    <div data-no-navigation>
      <Success
        orderItems={orderItems as CartItemProps[]}
        paymentInfoList={paymentInfoList(data, t)}
        shippingInfoList={shippingInfoList(shipping_info, t)}
        orderId={orderId}
        status={status}
        scheduledDateInfo={items
          ?.filter(item => item.good?.release_date && item.good?.is_pre_sale)
          .map(item => item.good?.release_date || '')}
      />
    </div>
  );
}
