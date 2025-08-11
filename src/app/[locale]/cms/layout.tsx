import React from 'react';

import AntdRegistry from '@/lib/antd-registry';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
