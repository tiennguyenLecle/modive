import React from 'react';
import { Checkbox, CheckboxProps, ConfigProvider } from 'antd';

type CheckboxComponentProps = CheckboxProps & {
  children: React.ReactNode;
};

const CheckboxComponent = ({ children, ...rest }: CheckboxComponentProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF627B',
        },
      }}
    >
      <Checkbox {...rest}>{children}</Checkbox>
    </ConfigProvider>
  );
};

export default CheckboxComponent;
