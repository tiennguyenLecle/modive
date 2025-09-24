'use client';

import { ComponentProps } from 'react';
import NProgress from 'nprogress';

import { Link, usePathname } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

type NavItemProps = ComponentProps<typeof Link> & {
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  text: string;
  activePaths?: string[];
};

export default function NavItem({
  href,
  icon,
  activeIcon,
  text,
  activePaths = [],
  ...rest
}: NavItemProps) {
  const pathname = usePathname();

  const isHome = href === ROUTES.HOME;
  const isActive = isHome
    ? pathname === ROUTES.HOME || activePaths.some(path => pathname === path)
    : pathname === href || activePaths.some(path => pathname.startsWith(path));

  const handleClick = () => {
    NProgress.start();
  };

  return (
    <Link
      href={href}
      {...rest}
      className={cx(
        isActive && 'active',
        'leading-none group flex flex-1 flex-col items-center justify-center text-11 font-normal text-gray-50 transition-colors duration-300 hover:text-primary active:text-primary'
      )}
      onClick={handleClick}
      prefetch={true}
    >
      <span className="mb-2 transition-all duration-300 group-hover:-translate-y-2">
        {isActive && activeIcon ? activeIcon : icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}
