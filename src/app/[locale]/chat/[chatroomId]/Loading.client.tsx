import React from 'react';

import styles from './LoadingDots.module.scss';

export const LoadingDots = () => {
  return (
    <div className={styles.dotLoading}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
