'use client';

import { useRef } from 'react';

import Chapter from '@/components/Chapter';
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
        footer={
          <button className="w-full rounded-5 border text-gray-00">
            다음 챕터로 넘어가기
          </button>
        }
      >
        <p className="text-gray-00">Would you like to withdraw?</p>
      </Modal>
    </div>
  );
}
