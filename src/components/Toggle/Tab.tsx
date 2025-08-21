'use client';

import React, { ComponentProps, useState } from 'react';

import { cx } from '@/utils/method';

type ToggleTabProps = ComponentProps<'button'> & {
  value: string;
  name: string;
  onToggle?: () => void;
  isActive?: boolean;
};

const ToggleTab: React.FC<ToggleTabProps> = ({
  value,
  name,
  onToggle,
  children,
  isActive,
  ...props
}) => {
  const [state, setState] = useState(isActive ?? false);

  return (
    <button
      title={name}
      onClick={() => {
        setState(state => !state);
        onToggle?.();
      }}
      className={cx(
        'flex h-40 items-center justify-center whitespace-nowrap rounded-8 border px-12 text-16 font-semibold transition-all duration-200',
        state
          ? 'border-purple bg-white text-purple'
          : 'border-transparent text-gray-50'
      )}
      {...props}
    >
      {children || name}
    </button>
  );
};

export default ToggleTab;
