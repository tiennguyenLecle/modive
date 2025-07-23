import { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';

import NavChat from '@/assets/icons/nav-chat.svg';
import NavHomeFilled from '@/assets/icons/nav-home-filled.svg';
import NavHome from '@/assets/icons/nav-home.svg';
import NavPersonFilled from '@/assets/icons/nav-person-filled.svg';
import NavPerson from '@/assets/icons/nav-person.svg';
import NavVase from '@/assets/icons/nav-vase.svg';
import { cx } from '@/utils/method';

import NavItem from './NavItem';

type NavigationProps = ComponentProps<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  const t = useTranslations();

  return (
    <nav
      className={cx('flex h-56 border-t border-gray-90', className)}
      {...rest}
    >
      <NavItem
        href="/"
        icon={<NavHome />}
        activeIcon={<NavHomeFilled />}
        text={t('nav.home')}
      />
      <NavItem href="/chat" icon={<NavChat />} text={t('nav.chat')} />
      <NavItem href="/goods" icon={<NavVase />} text={t('nav.goods')} />
      <NavItem
        href="/me"
        icon={<NavPerson />}
        activeIcon={<NavPersonFilled />}
        text={t('nav.me')}
      />
    </nav>
  );
}
