import React from 'react';

import { CmsSidebar } from '@/components/cms';
import AntdRegistry from '@/lib/antd-registry';
import { AuthProvider } from '@/lib/authentication/auth-context';

type Props = {
  children: React.ReactNode;
};

export default function CmsLayout({ children }: Props) {
  return (
    <AntdRegistry>
      <AuthProvider role="admin">
        <div className="admin-layout">
          <div className="sidebar-wrapper">
            <CmsSidebar />
          </div>
          <div className="page-wrapper">{children}</div>
        </div>
      </AuthProvider>
    </AntdRegistry>
  );
}
