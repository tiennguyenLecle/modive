'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { Direction } from '@/assets/icons';
import { AutoImage, Header, MenuTab } from '@/components';
import { useHashRoute } from '@/hooks/useHashRoute';
import { useWorkDetail } from '@/hooks/useWork';
import { WorkType } from '@/types/work';
import { cx, getPublicUrl } from '@/utils/method';

import { WorkProvider } from './_components/WorkProvider';

const DynamicTabCharacter = dynamic(
  () => import('./_components/tabs/TabCharacter.client'),
  {
    ssr: false,
  }
);

const DynamicTabRelationship = dynamic(
  () => import('./_components/tabs/TabRelationship.client'),
  {
    ssr: false,
  }
);

const DynamicTabCommunity = dynamic(
  () => import('./_components/tabs/TabCommunity.client'),
  {
    ssr: false,
  }
);

const DynamicTabEpisodes = dynamic(
  () => import('./_components/tabs/TabEpisodes.client'),
  {
    ssr: false,
  }
);

type IntroductionClientProps = {
  fallbackData: WorkType;
  workId: string;
};

export default function IntroductionClient({
  fallbackData,
  workId,
}: IntroductionClientProps) {
  const t = useTranslations('introduction');
  const { data: workDetail } = useWorkDetail(workId, fallbackData);

  const [activeTab, setActiveTab] = useHashRoute('character');

  if (!workDetail) {
    return null;
  }

  return (
    <WorkProvider workDetail={workDetail}>
      <div className={cx(activeTab === 'community' && 'flex h-full flex-col')}>
        <Header
          pageTitle={workDetail.title}
          showBackButton
          className="sticky top-0 z-50 border-b border-gray-80"
        />
        <div className={cx(activeTab === 'community' && 'h-0 overflow-hidden')}>
          <AutoImage
            src={getPublicUrl(workDetail.thumbnail_key)}
            alt={workDetail.title}
            priority
            defaultAspectRatio="720/464"
            className="h-auto w-full object-cover"
          />
          <div className="flex flex-col gap-13 bg-white p-16">
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
        <MenuTab
          className={cx(activeTab === 'episodes' && 'sticky top-56 z-50')}
          onTabChange={key => {
            setActiveTab(key);
          }}
          tabs={[
            {
              key: 'character',
              label: t('tabs.chat'),
              children: <DynamicTabCharacter />,
            },
            {
              key: 'relationship',
              label: t('tabs.personal_relationship'),
              children: <DynamicTabRelationship />,
            },
            {
              key: 'community',
              label: t('tabs.community'),
            },
            {
              key: 'episodes',
              label: t('tabs.episodes'),
            },
          ]}
          activeTab={activeTab}
        />
        {activeTab === 'community' && <DynamicTabCommunity />}
        {activeTab === 'episodes' && <DynamicTabEpisodes />}
      </div>
    </WorkProvider>
  );
}
