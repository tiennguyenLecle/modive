'use client';

import { useEffect } from 'react';
import { notification } from 'antd';
import { useSearchParams } from 'next/navigation';

import { confirmPayment } from '@/lib/supabase/swr/payment';

import FailPage from './_components/Failed.Client';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  const handleConfirmPayment = async () => {
    if (!orderId || !code || !message) {
      notification.error({
        message: 'Invalid orderId, code, or message',
      });
      return;
    }
    const { data, error } = await confirmPayment({
      code: code,
      message: message,
      order_id: orderId,
    });

    if (error) {
      notification.error({
        message: error,
      });
      return;
    }
  };

  useEffect(() => {
    handleConfirmPayment();
  }, []);

  return (
    <div data-no-navigation>
      <FailPage messageError={message || ''} />
    </div>
  );
}
