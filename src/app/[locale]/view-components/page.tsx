'use client';

import { useRef } from 'react';

import AlarmIcon from '@/assets/icons/alarm.svg';
import { Badge } from '@/components/Badge';
import Chapter from '@/components/Chapter';
import ChatListItem from '@/components/ChatListItem';
import Modal, { ModalHandle } from '@/components/Modal';
import RecommendationContainer from '@/components/Recommendation/Container';
import ContentsCard from '@/components/Recommendation/ContentsCard';
import ContentsCardList from '@/components/Recommendation/ContentsCardList';

export default function ComponentsPage() {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <div>
      <h1>Components</h1>
      <h2>Chapter</h2>
      <Chapter
        title="Chapter 1"
        img="https://picsum.photos/seed/1/150"
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <Chapter
        title="Chapter 2"
        img="https://picsum.photos/seed/2/150"
        locked
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <Chapter
        title="Chapter 3"
        img="https://picsum.photos/seed/3/150"
        episodes={[
          { key: '1', title: 'Episode 1', url: '#' },
          { key: '2', title: 'Episode 2', url: '#' },
        ]}
      />
      <h2>Recommendation</h2>
      <RecommendationContainer />
      <h2>Modal</h2>
      <button onClick={() => modalRef.current?.open()}>open modal</button>
      <Modal
        ref={modalRef}
        title="Modal title"
        titleAlign="left"
        // footer={
        //   <button className="rounded-5 w-full border text-gray-00">
        //     다음 챕터로 넘어가기
        //   </button>
        // }
        cancelText="Cancel"
        confirmText="Confirm"
      >
        <p className="text-gray-00">Would you like to withdraw?</p>
      </Modal>

      <h2>Chat list item</h2>
      <ChatListItem
        imageSrc="https://picsum.photos/seed/1/60"
        imageAlt="User Avatar"
        title="First shooting day -CH1. Honeymoon"
        description="It's awkward to be like you? lol"
        time="09:32 pm"
        count={100}
      />

      <h2>Badge</h2>
      <Badge.Wrapper count={3} showZero>
        <AlarmIcon width={24} height={24} className="text-primary" />
      </Badge.Wrapper>

      <div className="flex items-center justify-between p-2">
        <p>New message</p>
        <Badge.CountNode count={3} showZero />
      </div>
    </div>
  );
}
