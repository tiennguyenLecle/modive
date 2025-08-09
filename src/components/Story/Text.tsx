import React, { ComponentProps } from 'react';

type StoryTextProps = ComponentProps<'div'> & {};

const StoryText = ({ children, ...rest }: StoryTextProps) => {
  return (
    <div
      className="flex min-h-40 w-full flex-col gap-8 bg-gray-90 p-12 text-14 font-normal leading-1.66 -tracking-0.5 text-gray-20"
      {...rest}
    >
      {children}
    </div>
  );
};

export default StoryText;
