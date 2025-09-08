import { ComponentProps } from 'react';

import { cx } from '@/utils/method';

type EmptyProps = ComponentProps<'div'> & {
  message: string;
};

export default function Empty({ message, className, ...props }: EmptyProps) {
  return (
    <div
      className={cx(
        'flex h-full items-center justify-center bg-gray-90 px-16 text-center text-14 font-semibold text-gray-60',
        className
      )}
      {...props}
    >
      <p>{message}</p>
    </div>
  );
}
