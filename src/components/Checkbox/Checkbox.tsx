import React from 'react';
import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from 'antd';

import { cx } from '@/utils/method';

import styles from './Checkbox.module.scss';

type CheckboxProps = AntdCheckboxProps & {
  children?: React.ReactNode;
};

const Checkbox = ({ children, className, ...rest }: CheckboxProps) => {
  return (
    <AntdCheckbox className={cx(styles.checkbox, className)} {...rest}>
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
