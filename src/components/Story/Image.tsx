import React, { ComponentProps } from 'react';
import Image from 'next/image';

type StoryImageProps = ComponentProps<typeof Image> & {};

const StoryImage = ({ src, alt, width, height, ...rest }: StoryImageProps) => {
  return (
    <div className="h-160 flex items-center justify-center gap-10 rounded-12 bg-gray-100">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        {...rest}
      />
    </div>
  );
};

export default StoryImage;
