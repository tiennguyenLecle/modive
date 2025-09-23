'use client';

import { useEffect } from 'react';
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import {
  isAgreementAtom,
  paymentMethodAtom,
  paymentWidgetAtom,
} from '@/atoms/goodsAtom';

type PaymentMethodProps = {
  className?: string;
  totalAmount?: number;
};

export default function PaymentMethod({
  className = '',
  totalAmount = 1000,
}: PaymentMethodProps) {
  const t = useTranslations('ordering');

  const [widgets, setWidgets] = useAtom<any>(paymentWidgetAtom);
  const setIsAgreement = useSetAtom(isAgreementAtom);
  const setPaymentMethod = useSetAtom(paymentMethodAtom);

  const initTossPayments = async () => {
    try {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_WIDGET_KEY;
      const customerKey = ANONYMOUS;

      if (!clientKey || !customerKey) {
        console.error('Missing TossPayments client key or customer key');
        return;
      }

      const tossPayments = await loadTossPayments(clientKey);

      if (!tossPayments) {
        console.error('Failed to load TossPayments');
        return;
      }

      const widgets = tossPayments.widgets({
        customerKey,
      });

      if (!widgets) {
        console.error('Failed to create TossPayments widgets');
        return;
      }

      setWidgets(widgets);

      const amount = Math.max(totalAmount);
      await widgets.setAmount({
        currency: 'KRW',
        value: amount,
      });

      const [paymentWidget, agreementWidget] = await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),

        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      if (paymentWidget) {
        const paymentMethod = await paymentWidget.getSelectedPaymentMethod();
        setPaymentMethod(paymentMethod?.code as string);
        paymentWidget.on('paymentMethodSelect', selectedPaymentMethod => {
          setPaymentMethod(selectedPaymentMethod?.code as string);
        });
      }

      if (agreementWidget) {
        agreementWidget.on('agreementStatusChange', agreementStatus => {
          setIsAgreement(agreementStatus.agreedRequiredTerms);
        });
      }

      // Store the widget reference for future use
      // paymentMethodWidgetRef.current = paymentMethodWidget;
    } catch (error) {
      console.error('Error initializing TossPayments:', error);
    }
  };
  useEffect(() => {
    if (!widgets) {
      initTossPayments();
    }
  }, [widgets]);

  return (
    <div className={`flex flex-col gap-16 bg-white py-16 ${className}`}>
      <h5 className="px-16 text-16 font-semibold text-gray-00">
        {t('payment_method')}
      </h5>
      <div id="payment-method" />
      <div id="agreement" />
    </div>
  );
}
