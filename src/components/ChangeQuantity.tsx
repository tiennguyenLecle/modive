'use client';

import { useState } from 'react';

import { AddIcon, SubtractIcon } from '@/assets/icons';
import { cx } from '@/utils/method';

type ChangeQuantityProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

const ChangeQuantity = ({
  min = 1,
  max = Infinity,
  defaultValue = 1,
  onChange,
}: ChangeQuantityProps) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
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
          'flex h-28 w-28 items-center justify-center rounded-max border border-gray-80',
          quantity < max
            ? 'cursor-pointer bg-gray-100'
            : 'cursor-not-allowed bg-gray-90 opacity-50'
        )}
        onClick={handleIncrease}
      >
        <AddIcon width={14} height={14} className="text-gray-60" />
      </button>
    </div>
  );
};

export default ChangeQuantity;
