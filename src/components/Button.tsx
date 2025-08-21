// components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

import { cx } from '@/utils/method';

import Spinner from './Spinner';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
};

const Button = ({
  variant = 'primary',
  className = '',
  children,
  loading,
  ...props
}: ButtonProps) => {
  const baseStyle =
    'flex h-40 w-full items-center justify-center gap-8 rounded-4 p-12 text-14 font-medium disabled:opacity-80 disabled:cursor-not-allowed';

  const variantStyle =
    variant === 'primary'
      ? 'bg-primary text-gray-100'
      : 'border border-gray-70 bg-gray-100 text-gray-00';

  return (
    <button className={cx(baseStyle, variantStyle, className)} {...props}>
      {children}
      {loading && <Spinner />}
    </button>
  );
};

export default Button;
