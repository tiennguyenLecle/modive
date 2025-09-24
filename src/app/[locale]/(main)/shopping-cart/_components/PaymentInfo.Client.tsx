import { useTranslations } from 'next-intl';

type PaymentInfoProps = {
  className?: string;
  paymentAmount: number;
  productAmount: number;
  deliveryFee: number;
};

export default function PaymentInfo({
  className = '',
  paymentAmount,
  productAmount,
  deliveryFee,
}: PaymentInfoProps) {
  const t = useTranslations('shopping_cart');
  return (
    <div className={`${className} bg-white`}>
      <h3 className="flex flex-row items-center justify-between border-b border-t border-gray-80 p-16 text-16 font-semibold text-gray-00">
        {t('payment_amount')}{' '}
        <span className="text-20 font-medium">
          {paymentAmount?.toLocaleString()} {t('won')}
        </span>
      </h3>
      <div className="flex flex-col gap-16 px-24 py-16 text-14 text-gray-00">
        <p className="flex flex-row items-center justify-between">
          {t('product_amount')}{' '}
          <span className="text-16 font-semibold">
            {productAmount?.toLocaleString()} {t('won')}
          </span>
        </p>
        <p className="flex flex-row items-center justify-between gap-8">
          {t('delivery_fee')}{' '}
          <span className='text-16"'>
            +{deliveryFee?.toLocaleString()} {t('won')}
          </span>
        </p>
      </div>
    </div>
  );
}
