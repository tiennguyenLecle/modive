'use client';

import { useTranslations } from 'next-intl';

import { CartItemProps } from '@/atoms/goodsAtom';

import CartItem from '../../shopping-cart/_components/CartItem.Client';

type ProductInfoProps = {
  className?: string;
  items: CartItemProps[];
  title: string;
  totalProduct?: string | number;
};

export default function ProductInformation({
  className = '',
  items,
  title,
  totalProduct,
}: ProductInfoProps) {
  const t = useTranslations('ordering');
  return (
    <div className={`flex flex-col gap-16 bg-white py-16 ${className}`}>
      <h5 className="flex flex-row items-center gap-8 px-16 text-16 font-semibold text-gray-00">
        {title}
        {totalProduct ? (
          <>
            <span className="inline-block h-8 w-1 bg-gray-70" />{' '}
            <span className="font-normal">{totalProduct}</span>
          </>
        ) : null}
      </h5>
      <div className="flex flex-col gap-16">
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
