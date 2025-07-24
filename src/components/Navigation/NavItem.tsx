'use client';

import { ComponentProps } from 'react';

import { TransitionLink } from '@/components/TransitionLink';
import { usePathname } from '@/lib/navigation';
import { cx } from '@/utils/method';

type NavItemProps = ComponentProps<typeof TransitionLink> & {
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  text: string;
  children?: React.ReactNode;
};

export default function NavItem({
  href,
  icon,
  activeIcon,
  text,
  ...rest
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TransitionLink
      href={href}
      {...rest}
      className={cx(
        isActive && 'active',
        'group flex flex-1 flex-col items-center justify-center text-11 font-normal leading-none text-gray-50 transition-colors duration-300 hover:text-primary active:text-primary'
      )}
    >
      <span className="mb-2 transition-all duration-300 group-hover:-translate-y-2">
        {isActive && activeIcon ? activeIcon : icon}
      </span>
      <span>{text}</span>
    </TransitionLink>
  );
}
