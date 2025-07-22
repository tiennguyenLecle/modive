'use client';

import { type ComponentProps } from 'react';

import { Link, usePathname } from '@/lib/navigation';
import { cx } from '@/utils/method';

type Props = ComponentProps<typeof Link>;

export default function ActiveLink({ href, className, ...rest }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cx(isActive && 'text-primary', className)}
      {...rest}
    />
  );
}
