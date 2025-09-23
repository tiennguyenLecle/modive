'use client';

import { ComponentProps } from 'react';
import { Empty as AntdEmpty } from 'antd';

type EmptyProps = ComponentProps<typeof AntdEmpty>;

export default function Empty({ children, ...props }: EmptyProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AntdEmpty {...props} />
      {children}
    </div>
  );
}
