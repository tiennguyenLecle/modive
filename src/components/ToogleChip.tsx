'use client';

import React, { useState } from 'react';

interface ToggleChipProps {
  selected?: boolean;
  onToggle?: (selected: boolean) => void;
}

const ToggleChip: React.FC<ToggleChipProps> = ({
  selected = false,
  onToggle,
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleClick = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full border px-12 py-8 text-14 transition-all duration-200 ${
        isSelected
          ? 'border-[#FF627B] bg-[#FFDCE1] font-[600] text-[#FF627B]'
          : 'border-[#9C9EB0] bg-[#FFFFFF] font-[400] text-[#9C9EB0]'
      } `}
    >
      선택지
    </button>
  );
};

export default ToggleChip;
