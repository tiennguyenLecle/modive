import React, { ComponentProps } from 'react';

import ChatCardItem from '@/components/ChatCard/Item';

type ChatCardListProps = ComponentProps<'div'> & {};

const ChatCardList = ({}: ChatCardListProps) => {
  return (
    <div className="flex flex-col bg-gray-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <ChatCardItem key={i} />
      ))}
    </div>
  );
};

export default ChatCardList;
