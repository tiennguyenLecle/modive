'use client';

import React, { ComponentProps, useState } from 'react';
import { motion } from 'framer-motion';

import { Check, Close } from '@/assets/icons';
import { cx } from '@/utils/method';

type ToggleButtonProps = ComponentProps<'button'> & {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  initialState = false,
  onToggle,
  ...props
}) => {
  const [enabled, setEnabled] = useState(initialState);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={cx(
        'relative flex h-24 w-48 items-center rounded-max transition-colors duration-300',
        enabled ? 'bg-primary' : 'bg-gray-80'
      )}
      {...props}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="shadow-md absolute flex h-18 w-18 items-center justify-center rounded-max bg-white"
        style={{
          left: enabled ? 'calc(100% - 21rem)' : '3rem',
          boxShadow: '0px 4px 8px 0px #00000014',
        }}
      >
        {enabled ? (
          <Check className="h-5 w-7 object-cover text-primary" />
        ) : (
          <Close className="h-7 w-7 object-cover text-gray-00" />
        )}
      </motion.div>
    </button>
  );
};

export default ToggleButton;
