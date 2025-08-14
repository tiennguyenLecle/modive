import React from 'react';

import styles from './ThreeDotsLoading.module.scss';

export const ThreeDotsLoading = () => {
  return (
    <div className={styles.threeDotsLoading}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
