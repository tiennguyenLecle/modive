import React, { ComponentProps } from 'react';
import Image from 'next/image';

import { ArrowRight } from '@/assets/icons';
import { CharacterType } from '@/types/character';
import { cx, getPublicUrl } from '@/utils/method';

type CharacterCardItemProps = ComponentProps<'div'> & {
  character: CharacterType;
  onClickItem?: (character: CharacterType) => void;
};

const CharacterCardItem = ({
  className,
  character,
  character: { name, introduction, avatar_key },
  onClickItem,
  ...props
}: CharacterCardItemProps) => {
  return (
    <div
      className={cx(
        'flex min-h-90 cursor-pointer gap-12 rounded-12 border-b border-gray bg-white px-8 py-8 transition-colors duration-300 hover:bg-gray-90',
        className
      )}
      onClick={() => onClickItem?.(character)}
      {...props}
    >
      {/* Actor Image */}
      <div className="relative aspect-square h-60 w-60 overflow-hidden rounded-8 bg-gray-80">
        <Image src={getPublicUrl(avatar_key)} alt={name} fill />
      </div>

      {/* Actor Info */}
      <div className="flex flex-col gap-8">
        <p className="text-16 font-semibold text-gray-20">{name}</p>
        <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
          {introduction}
        </p>
        {/* <p className="text-14 font-normal leading-1.66 tracking-0.5 text-gray-00">
          {tags.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </p> */}
      </div>
      <ArrowRight className="ml-auto h-18 w-18 self-center text-primary" />
    </div>
  );
};

export default CharacterCardItem;
