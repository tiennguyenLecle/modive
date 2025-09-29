'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components';
import { useRouter } from '@/lib/navigation';
import { confirmPayment } from '@/lib/supabase/swr/payment';
import { ROUTES } from '@/utils/constants';

export default function PaymentFailClient() {
  const t = useTranslations('payments.fail');
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const message = searchParams.get('message');
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex w-full gap-12 p-16">
      <Button
        variant="primary"
        className="flex-1"
        onClick={() => {
          if (!orderId) {
            console.error({
              message: 'Invalid code, message, or orderId',
            });
          } else {
            confirmPayment({
              code: code || 'Unknown',
              message: message || 'Unknown',
              order_id: orderId,
            });
          }
          router.push(ROUTES.MANAGEMENT.MY_CASH);
        }}
      >
        {t('button.try_again')}
      </Button>
    </div>
  );
}
