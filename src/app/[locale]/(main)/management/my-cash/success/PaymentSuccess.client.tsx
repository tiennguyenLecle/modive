'use client';

import { notification } from 'antd';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { Button } from '@/components';
import { useRouter } from '@/lib/navigation';
import { confirmPayment } from '@/lib/supabase/swr/payment';
import { ROUTES, STORAGE } from '@/utils/constants';

import { useMyCash } from '../provider';

export default function PaymentSuccessClient() {
  const t = useTranslations('payments.success');
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get('amount');
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const { coinPackages } = useMyCash();

  const updateCash = useSWRMutation(
    'increaseCash',
    async () => {
      if (!orderId || !paymentKey || !amount) {
        console.error({
          message: 'Invalid orderId, paymentKey, or amount',
        });
        return;
      } else {
        const { data, error } = await confirmPayment({
          order_id: orderId,
          payment_key: paymentKey,
          amount: amount,
        });

        if (data.error) {
          notification.error({
            message: data.error,
          });
          return;
        }

        if (error) {
          throw new Error(error);
        }
        return data;
      }
    },
    {
      onSuccess: () => {
        const paymentSuccessCallback = sessionStorage.getItem(
          STORAGE.PAYMENT_SUCCESS_CALLBACK
        );
        if (paymentSuccessCallback) {
          router.push(paymentSuccessCallback);
          sessionStorage.removeItem(STORAGE.PAYMENT_SUCCESS_CALLBACK);
        } else {
          router.push(ROUTES.HOME);
        }
      },
      onError: error => {
        console.log(error);
      },
    }
  );

  const cash = coinPackages?.find(
    coinPackage => coinPackage.price === Number(amount)
  )?.coins_credit;

  return (
    <>
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
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => updateCash.trigger()}
          loading={updateCash.isMutating}
        >
          {t('button.check')}
        </Button>
      </div>
    </>
  );
}
