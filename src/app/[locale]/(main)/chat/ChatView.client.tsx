'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { MenuTab } from '@/components';
import { useRouter } from '@/lib/navigation';

import ChatRoomList from './_components/ChatRoomList.client';

export default function ChatView() {
  const t = useTranslations('chat_page');
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      <MenuTab
        onTabChange={key => {
          const params = new URLSearchParams(searchParams);
          params.set('key', key);
          if (key === 'community') {
            router.push(`?${params.toString()}`);
          } else {
            router.replace(`?${params.toString()}`);
          }
        }}
        tabs={[
          {
            key: 'general',
            label: t('generalization'),
          },
          {
            key: 'chapter',
            label: t('chapter'),
          },
        ]}
        defaultActiveKey={searchParams.get('key') || 'general'}
      />
      <ChatRoomList />
    </>
  );
}
