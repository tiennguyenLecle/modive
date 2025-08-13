import React, { ComponentProps } from 'react';

import { ArrowRight } from '@/assets/icons';
import { cx } from '@/utils/method';

type CharacterCardItemProps = ComponentProps<'div'> & {};

const CharacterCardItem = ({ className, ...props }: CharacterCardItemProps) => {
  return (
    <div
      className={cx(
        'flex min-h-90 gap-12 border-b border-gray bg-white py-8 transition-colors duration-300 hover:bg-gray-90/40',
        className
      )}
      {...props}
    >
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
      <ArrowRight className="ml-auto h-18 w-18 self-center text-primary" />
    </div>
  );
};

export default CharacterCardItem;
