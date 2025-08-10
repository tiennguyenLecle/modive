'use client';

import { useRef } from 'react';

import AlarmIcon from '@/assets/icons/alarm.svg';
import {
  Badge,
  Chapter,
  ChatListItem,
  Modal,
  ModalHandle,
  Recommendation,
  Story,
} from '@/components';

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
      <Recommendation.Container />
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

      <div className="p-2">
        <h2>Badge</h2>
        <Badge.Wrapper count={3} showZero>
          <AlarmIcon width={24} height={24} className="text-primary" />
        </Badge.Wrapper>
        <Badge.CountNode count={3} showZero />
      </div>
      <div className="p-2">
        <h2>Story Component</h2>

        <div className="flex flex-col gap-16 bg-white p-16">
          <Story.Text>
            {
              'You have made their debut only after a tough trainee life. But the public&apos;s response is still cold ... We got married. He will appear in the reality entertainment program We Got Married to show a virtual marriage.'
            }
          </Story.Text>
          <Story.Image
            src="https://picsum.photos/seed/1/400"
            alt="Story Image"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="p-2">
        <h2>Story Component</h2>

        <div className="flex flex-col gap-16 bg-white p-16">
          <Story.Text>
            {
              'You have made their debut only after a tough trainee life. But the public&apos;s response is still cold ... We got married. He will appear in the reality entertainment program We Got Married to show a virtual marriage.'
            }
          </Story.Text>
          <Story.Image
            src="https://picsum.photos/seed/1/400"
            alt="Story Image"
            width={160}
            height={160}
          />
        </div>
      </div>
    </div>
  );
}
