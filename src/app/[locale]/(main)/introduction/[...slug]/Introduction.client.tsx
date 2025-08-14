'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import { CharacterCard, MenuTab, ModalHandle } from '@/components';

import ModalCharacter from './_components/modals/ModalCharacter';

export default function IntroductionClient() {
  const t = useTranslations('introduction');

  const modalCharacterRef = useRef<ModalHandle>(null);
  return (
    <>
      <MenuTab
        tabs={[
          {
            key: 'chat',
            label: t('tabs.chat'),
            children: (
              <CharacterCard.List
                itemProps={{
                  onClick: () => {
                    modalCharacterRef.current?.open();
                  },
                }}
              />
            ),
          },
          {
            key: 'personalRelationship',
            label: t('tabs.personal_relationship'),
            children: <div className="p-16">Story content goes here.</div>,
          },
        ]}
        defaultActiveKey="chat"
        className="container"
      />
      <ModalCharacter ref={modalCharacterRef} />
    </>
  );
}
