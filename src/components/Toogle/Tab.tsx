'use client';

import React, { useState } from 'react';

import { cx } from '@/utils/method';

const tabs = ['#tab1', '#tab2'];

const ToggleTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('#tab2');

  return (
    <div className="flex space-x-12">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cx(
            'flex h-40 items-center justify-center rounded-8 border p-12 text-16 font-[600] transition-all duration-200',
            activeTab === tab
              ? 'border-purple bg-white text-purple'
              : 'border-transparent text-gray-50'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ToggleTab;
