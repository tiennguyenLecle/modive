'use client';

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { ArrowRight, Cart } from '@/assets/icons';
import {
  isAgreementAtom,
  myCartAtom,
  paymentMethodAtom,
  paymentWidgetAtom,
  shippingFormAtom,
} from '@/atoms/goodsAtom';
import Button from '@/components/Button';
import { useRouter } from '@/lib/navigation';
import { createOrder } from '@/lib/supabase/swr/order';
import { ROUTES } from '@/utils/constants';

import PaymentInfo from '../../shopping-cart/_components/PaymentInfo.Client';
import { mappedCartItems } from '../../shopping-cart/_components/utils';
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

  useEffect(() => {
    if (!myCartValue) {
      router.push(ROUTES.SHOPPING_CART);
    }
  }, [myCartValue]);

  if (!myCartValue) return null;

  const productAmount = myCartValue?.items?.reduce(
    (acc, item) => acc + item.good.price * item.quantity,
    0
  );
  const deliveryFee = myCartValue?.items?.reduce(
    (acc, item) => acc + item.good.delivery_fee,
    0
  );
  const paymentAmount = productAmount + deliveryFee;

  const onFinishShippingForm = async () => {
    setIsPaymentLoading(true);
    try {
      const response: any = await createOrder({
        items: myCartValue?.items,
        shipping_info: {
          address: shippingForm,
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
          successUrl:
            window.location.origin + '/ordering/success?order_id=' + order?.id,
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
      !shippingForm.phone_number
    );
  };

  const isDisabledOrderBtn = () => {
    return !paymentMethod || !isAgreement || hasEmptyShippingForm();
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
