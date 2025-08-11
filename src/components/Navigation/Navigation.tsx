import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import {
  NavChat,
  NavHome,
  NavHomeFilled,
  NavPerson,
  NavPersonFilled,
  NavVase,
} from '@/assets/icons';
import { ROUTES } from '@/utils/constants';
import { cx } from '@/utils/method';

import NavItem from './NavItem';

type NavigationProps = ComponentProps<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  const t = useTranslations('nav');

  return (
    <nav
      className={cx('flex h-56 border-t border-gray-90 bg-white', className)}
      {...rest}
    >
      <NavItem
        href={ROUTES.HOME}
        icon={<NavHome />}
        activeIcon={<NavHomeFilled />}
        text={t('home')}
      />
      <NavItem href={ROUTES.CHAT} icon={<NavChat />} text={t('chat')} />
      <NavItem href={ROUTES.GOODS} icon={<NavVase />} text={t('goods')} />
      <NavItem
        href={ROUTES.MANAGEMENT.INDEX}
        icon={<NavPerson />}
        activeIcon={<NavPersonFilled />}
        text={t('me')}
      />
    </nav>
  );
}
