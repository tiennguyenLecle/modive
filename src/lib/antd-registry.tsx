'use client';

import React from 'react';
import {
  createCache,
  extractStyle,
  px2remTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { useServerInsertedHTML } from 'next/navigation';

const AntdRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo(() => createCache(), []);
  const transformer = px2remTransformer({ rootValue: 1 });
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <StyleProvider cache={cache} transformers={[transformer]}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF627B',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdRegistry;
