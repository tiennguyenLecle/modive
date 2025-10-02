'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { CartItemProps } from '@/atoms/goodsAtom';
import ChangeQuantity from '@/components/ChangeQuantity';
import Checkbox from '@/components/Checkbox/Checkbox';
import DefaultImageComponent from '@/components/DefaultImage';
import { formatDateOrTime } from '@/utils/formatTime';

import InfoBlock from './InfoBlock.Client';

export default function CartItem({
  image,
  title,
  price,
  shippingFee,
  scheduledDate,
  id,
  quantity,
  remainingCount,
  showCheckbox,
  checked,
  showOrderCount = false,
  showAddItem = false,
  onCheckboxChange,
  onCountChange,
  children,
  orderStatus,
}: CartItemProps) {
  const t = useTranslations('shopping_cart');

  const handleCheckboxChange = (id: string) => {
    onCheckboxChange && onCheckboxChange(id);
  };

  console.log('Remaining count', remainingCount);

  return (
    <div className="flex w-full flex-col gap-12 border-b border-gray-80 bg-white p-16 last:border-b-0">
      <div className="flex flex-row items-start gap-12">
        {showCheckbox && (
          <Checkbox
            checked={checked}
            disabled={false}
            className="h-18 min-w-18"
            onChange={() => handleCheckboxChange(id)}
          />
        )}
        {image ? (
          <Image
            className="h-100 w-100 rounded-8 object-cover"
            width={100}
            height={100}
            src={image}
            alt="Order Item"
          />
        ) : (
          <DefaultImageComponent className="!h-100 !w-100" />
        )}
        <div className="flex flex-col text-gray-00">
          <h3 className="mb-11 line-clamp-2 text-16 font-normal">{title}</h3>
          <p className="mb-8 line-clamp-1 flex flex-row items-center gap-8 text-16 font-bold">
            {price?.toLocaleString()} {t('won')}
            {showOrderCount ? (
              <>
                <span className="inline-block h-8 w-1 bg-gray-70 text-gray-70" />
                {quantity} {t('pieces')}
              </>
            ) : (
              ''
            )}
          </p>
          <p className="line-clamp-1 text-12 font-normal">
            {!!shippingFee && (
              <>
                {t('shipping_fee')} {shippingFee?.toLocaleString()} {t('won')}
              </>
            )}
            {orderStatus && <>{orderStatus}</>}
          </p>
        </div>
      </div>
      {scheduledDate && (
        <InfoBlock scheduledDate={formatDateOrTime(scheduledDate, 'date')} />
      )}
      {showAddItem && (
        <div className="flex flex-1 flex-row items-center justify-between text-12 text-primary">
          <span className="mr-auto">
            {/* {t('remaining_count')}: {remainingCount} */}
          </span>

          <ChangeQuantity
            defaultValue={quantity}
            onChange={(value, type) => {
              if (type === 'increase') {
                onCountChange && onCountChange(value + 1, id);
              } else {
                onCountChange && onCountChange(value - 1, id);
              }
            }}
            max={remainingCount ? Math.min(remainingCount, 3) : 0}
          />
        </div>
      )}
      {children}
    </div>
  );
}
