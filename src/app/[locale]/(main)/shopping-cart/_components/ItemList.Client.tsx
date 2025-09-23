import { CartItemProps } from '@/atoms/goodsAtom';

import CartItem from './CartItem.Client';

type ItemListProps = {
  isActive: boolean;
  orderListByType: CartItemProps[];
  title: string;
  className?: string;
  onCheckboxChange?: (id: string) => void;
  onCountChange?: (count: number, id: string) => void;
};

export const ItemListBlock = ({
  isActive,
  orderListByType,
  title,
  className = '',
  onCheckboxChange,
  onCountChange,
}: ItemListProps) => {
  return (
    <div className={className}>
      <h3
        className={`border-b border-t px-16 py-8 text-14 font-semibold text-gray-40 ${isActive ? 'text-primary' : 'text-gray-40'} ${isActive ? 'border-tertiary' : 'border-gray-80'}`}
        style={{
          background: isActive
            ? 'linear-gradient(0deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%), var(--color-primary-tertiary, #FFDCE1)'
            : 'var(--gray-90)',
        }}
      >
        {title}
      </h3>
      <div className="flex flex-col">
        {orderListByType.map(item => (
          <CartItem
            key={item.id}
            {...item}
            onCheckboxChange={onCheckboxChange}
            onCountChange={onCountChange}
          />
        ))}
      </div>
    </div>
  );
};
