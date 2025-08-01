import React, { ComponentProps } from 'react';

import ArrowRight from '@/assets/icons/arrow-right.svg';

type ChatCardItemProps = ComponentProps<'div'> & {};

const ChatCardItem = ({}: ChatCardItemProps) => {
  return (
    <div className="flex min-h-90 items-center gap-12 border-b border-gray bg-white py-8">
      <div className="flex items-start gap-12">
        {/* Actor Image */}
        <div className="aspect-square h-60 w-60 rounded-8 bg-gray-80"></div>
        {/* Actor Info */}
        <div className="flex flex-col gap-8">
          <p className="text-16 font-semibold text-gray-20">Kang Lee -hyun</p>
          <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
            Visual Center of the 1st Army Idol.
          </p>
          <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
            #Center #Pro Idol #Tsundere
          </p>
        </div>
      </div>
      <ArrowRight className="h-18 w-18 text-primary" />
    </div>
  );
};

export default ChatCardItem;
