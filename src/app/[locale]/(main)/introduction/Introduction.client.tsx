'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Direction } from '@/assets/icons';
import { CharacterCard, Header, MenuTab } from '@/components';
import { useHashRoute } from '@/hooks/useHashRoute';
import { useWorkDetail } from '@/hooks/useWork';
import { useRouter } from '@/lib/navigation';
import { WorkType } from '@/types/work';
import { cx, getPublicUrl } from '@/utils/method';

import ModalCharacter from './_components/modals/ModalCharacter';
import TabCommunity from './_components/tabs/TabCommunity.client';
import styles from './Introduction.module.scss';

type IntroductionClientProps = {
  fallbackData: WorkType;
  workId: string;
};

export default function IntroductionClient({
  fallbackData,
  workId,
}: IntroductionClientProps) {
  const t = useTranslations('introduction');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: workDetail } = useWorkDetail(workId, fallbackData);

  const [activeTab, setActiveTab] = useHashRoute('character');

  const modalCharacterRef =
    useRef<React.ElementRef<typeof ModalCharacter>>(null);

  if (!workDetail) {
    return null;
  }

  return (
    <div className={styles.introductionLayout}>
      <Header
        pageTitle={workDetail.title}
        showBackButton
        className="border-b border-gray-80"
      />
      <div className="flex min-h-0 flex-1 flex-col">
        <div
          className={cx(
            styles.introductionHeader,
            activeTab === 'community' && styles.collapsedIntroductionHeader
          )}
        >
          <Image
            src={getPublicUrl(workDetail.thumbnail_key)}
            alt={workDetail.title}
            priority
            width={360}
            height={232}
            className="aspect-[360/232] h-auto w-full object-cover"
          />
          <div className="flex flex-col gap-13 p-16">
            <h2 className="text-22 font-semibold text-gray-20">
              {workDetail.title}
            </h2>
            <div>
              <p className="text-14 font-normal leading-1.66 -tracking-0.07 text-gray-00">
                {workDetail.description}
              </p>
              <p className="flex gap-8 text-14 font-normal leading-1.66 -tracking-0.07 text-gray-00">
                {workDetail.tags?.map(tag => (
                  <span key={tag}>#{tag}</span>
                ))}
              </p>
            </div>
            <button className="flex h-48 w-full items-center justify-center gap-8 rounded-4 bg-primary">
              <p className="text-16 font-bold text-gray-100">
                {t('chapter_entrance')}
              </p>
              <Direction color="white" className="h-16 w-16" />
            </button>
          </div>
        </div>
        <div className={styles.introductionTabs}>
          <MenuTab
            className="flex h-full flex-col"
            onTabChange={key => {
              setActiveTab(key, key !== 'community');
            }}
            tabs={[
              {
                key: 'character',
                label: t('tabs.chat'),
                children: (
                  <CharacterCard.List
                    characters={workDetail.characters}
                    itemProps={{
                      onClick: character => {
                        const params = new URLSearchParams(searchParams);
                        params.set('character', character.id);
                        router.replace(`?${params.toString()}`);
                      },
                    }}
                    className="px-8"
                  />
                ),
              },
              {
                key: 'relationship',
                label: t('tabs.personal_relationship'),
                children: (
                  <div className="container">
                    <div className="relative aspect-square">
                      <Image
                        src={getPublicUrl(workDetail.characters_map_key)}
                        alt={`${workDetail.title} characters map`}
                        className="object-contain"
                        fill
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: 'community',
                label: t('tabs.community'),
                children: <TabCommunity />,
              },
            ]}
            activeTab={activeTab}
          />
          <ModalCharacter ref={modalCharacterRef} />
        </div>
      </div>
    </div>
  );
}
