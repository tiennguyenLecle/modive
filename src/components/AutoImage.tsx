'use client';

import { ComponentProps, useState } from 'react';
import Image from 'next/image';

type AutoImageProps = ComponentProps<typeof Image> & {
  /**
   * @param defaultAspectRatio The default aspect ratio of the image. E.g. "1/1", "16/9", "4/3", etc.
   */
  defaultAspectRatio?: string;
};

function AutoImage({
  src,
  alt,
  defaultAspectRatio = '1/1',
  onLoadingComplete,
  ...props
}: AutoImageProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  return (
    <div
      className="relative"
      style={{
        width: '100%',
        aspectRatio: dimensions
          ? `${dimensions.width}/${dimensions.height}`
          : defaultAspectRatio,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        {...props}
        onLoadingComplete={element => {
          const { naturalWidth, naturalHeight } = element;
          setDimensions({ width: naturalWidth, height: naturalHeight });
          onLoadingComplete?.(element);
        }}
      />
    </div>
  );
}

export default AutoImage;
