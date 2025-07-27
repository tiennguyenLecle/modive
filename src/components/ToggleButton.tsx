'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import CheckIcon from '@/assets/icons/check.svg';
import CloseIcon from '@/assets/icons/close.svg';

interface ToggleButtonProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  initialState = false,
  onToggle,
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
      className={`relative flex h-24 w-48 items-center rounded-full transition-colors duration-300 ${
        enabled ? 'bg-[#FF627B]' : 'bg-[#F0EFF1]'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute flex h-18 w-18 items-center justify-center rounded-full bg-white shadow-md"
        style={{ left: enabled ? 'calc(100% - 21rem)' : '3rem' }}
      >
        {enabled ? (
          <CheckIcon className="h-5 w-7 object-cover text-[#FF627B]" />
        ) : (
          <CloseIcon className="h-7 w-7 object-cover text-[#9C9EB0]" />
        )}
      </motion.div>
    </button>
  );
};

export default ToggleButton;
