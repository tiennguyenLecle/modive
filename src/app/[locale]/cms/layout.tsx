import React from 'react';

import { CmsSidebar } from '@/components/cms';
import AntdRegistry from '@/lib/antd-registry';

type Props = {
  children: React.ReactNode;
};

export default function CmsLayout({ children }: Props) {
  return (
    <AntdRegistry>
      <div className="flex !min-h-screen">
        <CmsSidebar />
        {children}
      </div>
    </AntdRegistry>
  );
}
