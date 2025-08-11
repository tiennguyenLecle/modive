'use client';

import { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';

import { usePathname } from '@/lib/navigation';

const CmsBreadCrumb = () => {
  const t = useTranslations('cms.menu');
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    if (!pathname) return [] as { title: React.ReactNode }[];
    const parts = pathname.split('/').filter(Boolean);
    parts.shift(); // remove locale
    return parts.map(segment => {
      const key = segment.replace(/-/g, '_');
      return { title: t(key) };
    });
  }, [pathname, t]);

  return <Breadcrumb items={breadcrumbItems} />;
};

export default CmsBreadCrumb;
