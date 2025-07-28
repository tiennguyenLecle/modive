'use client';

import React, { ComponentProps, useState } from 'react';

import { cx } from '@/utils/method';

type ToggleChipProps = ComponentProps<'button'> & {
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
  isFitWidth?: boolean;
};

const ToggleChip: React.FC<ToggleChipProps> = ({
  selected = false,
  onToggle,
  isFitWidth,
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleClick = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={cx(
        'rounded-max border px-12 py-8 text-14 transition-all duration-200',
        isFitWidth ? 'w-fit' : 'w-full',
        isSelected
          ? 'border-primary bg-tertiary font-semibold text-primary'
          : 'border-gray-50 bg-gray-100 font-normal text-gray-50'
      )}
      {...props}
    >
      선택지
    </button>
  );
};

export default ToggleChip;
