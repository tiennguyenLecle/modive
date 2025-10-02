'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { AddIcon, SubtractIcon } from '@/assets/icons';
import { cx } from '@/utils/method';

type ChangeQuantityProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number, type: 'increase' | 'decrease') => void;
};

const ChangeQuantity = ({
  min = 1,
  max = Infinity,
  defaultValue = 1,
  onChange,
}: ChangeQuantityProps) => {
  const t = useTranslations('components.change_quantity');
  const [quantity, setQuantity] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue, 'decrease');
      setError(null);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue, 'increase');
      setError(null);
    } else {
      setError(t('max_value', { max }));
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          type="button"
          className={cx(
            'flex h-28 w-28 items-center justify-center rounded-max border border-gray-80',
            quantity > min
              ? 'cursor-pointer bg-gray-100'
              : 'cursor-not-allowed bg-gray-90 opacity-50'
          )}
          onClick={handleDecrease}
        >
          <SubtractIcon width={14} height={14} className="text-gray-60" />
        </button>

        <div className="min-w-40 text-center text-14 font-semibold text-gray-30">
          {quantity}
        </div>

        <button
          type="button"
          className={cx(
            'flex h-28 w-28 items-center justify-center rounded-max border border-gray-80'
          )}
          onClick={handleIncrease}
        >
          <AddIcon width={14} height={14} className="text-gray-60" />
        </button>
      </div>
      {error && <div className="text-12 font-normal text-red">{error}</div>}
    </div>
  );
};

export default ChangeQuantity;
