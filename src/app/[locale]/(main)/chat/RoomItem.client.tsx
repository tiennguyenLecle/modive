import { forwardRef } from 'react';
import Image from 'next/image';

export type RoomItemProps = {
  onClick: (e: any) => void;
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  lastMessage: string;
  unreadCount: number;
  sessionId: string;
};

const RoomItem = forwardRef<HTMLDivElement, RoomItemProps>(
  ({ id, name, avatar, createdAt, lastMessage, unreadCount, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-row items-center gap-16 border-b border-gray-90 py-16"
        key={id}
        onClick={() => {
          onClick(id);
        }}
      >
        <div className="flex h-60 w-60 flex-col gap-8 rounded-[50%]">
          <Image
            className="rounded-[50%]"
            src={avatar}
            alt={name}
            width={60}
            height={60}
          />
        </div>
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex items-center justify-between">
            <h3 className="max-w-[70%] truncate text-16 font-bold text-gray-00">
              {name}
            </h3>
            <span className="text-12 font-semibold text-gray-50">
              {createdAt}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="line-clamp-2 max-w-[70%] text-14 text-gray-50">
              {lastMessage}
            </p>
            {unreadCount > 0 && (
              <span className="rounded-[50%] bg-primary px-5 py-0 text-12 font-semibold text-gray-100">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

RoomItem.displayName = 'RoomItem';

export default RoomItem;
