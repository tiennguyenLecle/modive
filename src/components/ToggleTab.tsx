'use client';

import React, { useState } from 'react';

const tabs = ['#tab1', '#tab2'];

const ToggleTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('#tab2');

  return (
    <div className="flex space-x-12">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex h-40 items-center justify-center rounded-8 border p-12 text-16 font-[600] transition-all duration-200 ${
            activeTab === tab
              ? 'border-[#B49BFF] bg-white text-[#B49BFF]'
              : 'border-transparent text-[#9C9EB0]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ToggleTab;
