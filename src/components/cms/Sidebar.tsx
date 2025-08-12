'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Layout, Menu, type MenuProps } from 'antd';
import { useLocale, useTranslations } from 'next-intl';

import { Logo } from '@/assets/icons';
import { useAuth } from '@/lib/authentication/auth-context';
import { Link, usePathname } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

export default function CmsSidebar() {
  const { signOut } = useAuth();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('cms.menu');

  const menuItems: MenuProps['items'] = [
    {
      key: ROUTES.CMS.DATA_MANAGEMENT.INDEX,
      label: t('data_management'),
      children: [
        {
          key: ROUTES.CMS.DATA_MANAGEMENT.CONTENT,
          label: (
            <Link href={ROUTES.CMS.DATA_MANAGEMENT.CONTENT}>
              {t('content')}
            </Link>
          ),
        },
        {
          key: ROUTES.CMS.DATA_MANAGEMENT.GOODS,
          label: (
            <Link href={ROUTES.CMS.DATA_MANAGEMENT.GOODS}>{t('goods')}</Link>
          ),
        },
        {
          key: ROUTES.CMS.DATA_MANAGEMENT.NOTIFICATIONS,
          label: (
            <Link href={ROUTES.CMS.DATA_MANAGEMENT.NOTIFICATIONS}>
              {t('notifications')}
            </Link>
          ),
        },
        {
          key: ROUTES.CMS.DATA_MANAGEMENT.FAQ,
          label: <Link href={ROUTES.CMS.DATA_MANAGEMENT.FAQ}>{t('faq')}</Link>,
        },
      ],
    },
    { type: 'divider' },
    {
      key: ROUTES.CMS.INTERFACE,
      label: <Link href={ROUTES.CMS.INTERFACE}>{t('interface')}</Link>,
    },
    {
      key: ROUTES.CMS.USER_MANAGEMENT,
      label: (
        <Link href={ROUTES.CMS.USER_MANAGEMENT}>{t('user_management')}</Link>
      ),
    },
  ];

  const { selectedKey, defaultOpenKeys } = useMemo(() => {
    if (!pathname)
      return {
        selectedKey: ROUTES.CMS.DATA_MANAGEMENT.CONTENT,
        defaultOpenKeys: [ROUTES.CMS.DATA_MANAGEMENT.INDEX],
      };
    const prefix = `/${locale}`;
    const withoutLocale = pathname.startsWith(prefix)
      ? pathname.slice(prefix.length)
      : pathname;
    const matchKey = [
      ROUTES.CMS.DATA_MANAGEMENT.CONTENT,
      ROUTES.CMS.DATA_MANAGEMENT.GOODS,
      ROUTES.CMS.DATA_MANAGEMENT.NOTIFICATIONS,
      ROUTES.CMS.DATA_MANAGEMENT.FAQ,
      ROUTES.CMS.INTERFACE,
      ROUTES.CMS.USER_MANAGEMENT,
    ].find(route => withoutLocale.startsWith(route));
    const selectedKey = matchKey || ROUTES.CMS.DATA_MANAGEMENT.CONTENT;
    const defaultOpenKeys = selectedKey.startsWith(
      ROUTES.CMS.DATA_MANAGEMENT.INDEX
    )
      ? [ROUTES.CMS.DATA_MANAGEMENT.INDEX]
      : [];
    return { selectedKey, defaultOpenKeys };
  }, [pathname, locale]);

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  useEffect(() => {
    setOpenKeys(defaultOpenKeys);
  }, [defaultOpenKeys]);

  return (
    <Layout.Sider className="!bg-white">
      <div className="flex h-56 items-center justify-center">
        <Logo />
      </div>
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={keys => setOpenKeys(keys as string[])}
        className="border-r-0"
      />
      <div className="p-12">
        <Button
          type="text"
          block
          onClick={() => signOut()}
          className="!justify-start"
        >
          {t('sign_out')}
        </Button>
      </div>
    </Layout.Sider>
  );
}
