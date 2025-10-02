'use client';

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { ArrowRight, Cart } from '@/assets/icons';
import {
  isAgreementAtom,
  isTermCheckedAtom,
  myCartAtom,
  paymentMethodAtom,
  paymentWidgetAtom,
  shippingFormAtom,
} from '@/atoms/goodsAtom';
import Button from '@/components/Button';
import { useRouter } from '@/lib/navigation';
import { createOrder, reserveOrder } from '@/lib/supabase/swr/order';
import { ROUTES } from '@/utils/constants';

import PaymentInfo from '../../shopping-cart/_components/PaymentInfo.Client';
import { mappedCartItems } from '../../shopping-cart/_components/utils';
import { useCalcPaymentAmount } from '../../shopping-cart/hooks/useCalcPaymentAmount';
import PaymentMethod from './PaymentMethod.Client';
import ProductInformation from './ProductInformation.Client';
import ShippingForm from './ShippingForm.Client';
import Term from './Term.Client';

export default function Ordering() {
  const router = useRouter();
  const t = useTranslations('ordering');
  const myCartValue = useAtomValue(myCartAtom);
  const paymentMethod = useAtomValue<string | null>(paymentMethodAtom);
  const isAgreement = useAtomValue<boolean>(isAgreementAtom);
  const shippingForm = useAtomValue(shippingFormAtom);
  const paymentWidget = useAtomValue(paymentWidgetAtom);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const isTermChecked = useAtomValue(isTermCheckedAtom);
  const [expireOrderTime, setExpireOrderTime] = useState<string | null>(null);
  const [reserveOrderId, setReserveOrderId] = useState<string | null>(null);

  const { productAmount, deliveryFee, paymentAmount } = useCalcPaymentAmount(
    myCartValue?.items ?? []
  );

  const handleReserveOrder = async () => {
    if (!myCartValue) return;
    const response = await reserveOrder({
      items: myCartValue?.items ?? [],
      expirationMs: 1000 * 60 * 10,
    });
    if (response) {
      setExpireOrderTime(response.expire_at);
      setReserveOrderId(response.id);
    }
  };

  useEffect(() => {
    if (!myCartValue) {
      router.push(ROUTES.SHOPPING_CART);
    }
    handleReserveOrder();
  }, []);

  // Check if order has expired every second
  useEffect(() => {
    if (!expireOrderTime) return;

    const checkExpiration = () => {
      const currentTime = new Date().getTime();
      const expireTime = new Date(expireOrderTime).getTime();

      if (currentTime >= expireTime) {
        notification.info({
          message: t('order_expired'),
        });
        router.push(ROUTES.SHOPPING_CART);
      }
    };

    // Check immediately
    checkExpiration();

    // Set up interval to check every second
    const interval = setInterval(checkExpiration, 1000);

    // Cleanup interval on component unmount or when expireOrderTime changes
    return () => clearInterval(interval);
  }, [expireOrderTime, router]);

  if (!myCartValue) return null;

  const onFinishShippingForm = async () => {
    try {
      setIsPaymentLoading(true);
      const addressId = shippingForm?.id;

      const response: any = await createOrder({
        items: myCartValue?.items,
        reserve_order_id: reserveOrderId ?? '',
        shipping_info: {
          address_id: addressId,
          address: addressId
            ? null
            : {
                ...shippingForm,
                note:
                  shippingForm?.note === 'Direct input'
                    ? shippingForm?.note_custom
                    : shippingForm?.note,
              },
        },
        payment_method: paymentMethod || '',
      });

      if (!response?.data) {
        notification.error({
          message: response?.error,
        });
        return;
      }
      const order = response?.data;

      if (order) {
        setIsPaymentLoading(false);
        await paymentWidget.requestPayment({
          orderId: order?.id,
          orderName: order?.id,
          successUrl: window.location.origin + '/ordering/success',
          failUrl: window.location.origin + '/ordering/failed',
          customerEmail: order?.shipping_info?.email,
          customerName: order?.shipping_info?.receiver_name,
        });
      }
    } catch (error) {
      setIsPaymentLoading(false);
      notification.error({
        message: '결제 중 오류가 발생했습니다.',
      });
      return;
    }
  };

  const hasEmptyShippingForm = () => {
    return (
      !shippingForm ||
      !shippingForm.receiver_name ||
      !shippingForm.address ||
      !shippingForm.phone_number ||
      !shippingForm.detailed_address
    );
  };

  const isDisabledOrderBtn = () => {
    return (
      !paymentMethod || !isAgreement || hasEmptyShippingForm() || !isTermChecked
    );
  };

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
        <h1 className="flex-1 text-center text-16 font-bold">
          {t('ordering')}
        </h1>

        <button
          className="h-24 w-24 bg-gray-100"
          onClick={() => {
            router.push(ROUTES.GOODS);
          }}
        >
          <Cart className="h-24 w-24" />
        </button>
      </div>
      <div className="relative flex max-h-[calc(100dvh-56rem)] flex-col gap-8 overflow-y-auto overflow-x-hidden bg-gray-90">
        <ShippingForm />

        <ProductInformation
          items={mappedCartItems(myCartValue?.items, false, true, false)}
          title={t('product_information')}
        />

        <PaymentMethod totalAmount={paymentAmount} />

        <PaymentInfo
          paymentAmount={paymentAmount}
          productAmount={productAmount}
          deliveryFee={deliveryFee}
        />

        <div className="flex flex-col gap-8 bg-white p-16">
          <Term />
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={isDisabledOrderBtn()}
            onClick={onFinishShippingForm}
            loading={isPaymentLoading}
          >
            {paymentAmount?.toLocaleString()}
            {t('won')} {t('payment')}
          </Button>
        </div>
      </div>
    </>
  );
}
