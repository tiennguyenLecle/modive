import { ReactNode } from 'react';

import EmptyBlock from '@/components/Empty';
import { cn } from '@/lib/chatbot-modules';

type InfoItem = {
  label: ReactNode;
  value: any;
};

type InfoListProps = {
  className?: string;
  title: ReactNode;
  infoList: InfoItem[] | null;
  children?: ReactNode;
};

export default function InfoList({
  className,
  title,
  infoList,
  children,
}: InfoListProps) {
  return (
    <div className={cn('bg-white pt-16', className)}>
      <h3 className="px-16 pb-16 text-16 font-semibold text-gray-00">
        {title}
      </h3>
      {infoList && infoList?.length > 0 ? (
        <div className="flex flex-col items-center gap-16 border-b border-t border-gray-80 last:border-b-0">
          <ul className="flex w-full flex-col gap-16 px-24 py-16">
            {infoList?.map((item, index) => (
              <li
                key={index}
                className="flex w-full flex-row items-center gap-12 text-14 font-normal text-gray-00"
              >
                <span className="w-[30%] text-gray-50">{item.label}</span>
                <span className="flex-1">{item.value}</span>
              </li>
            ))}
          </ul>
          {children}
        </div>
      ) : (
        <EmptyBlock />
      )}
    </div>
  );
}
