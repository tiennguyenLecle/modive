'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { Header, MenuTab } from '@/components';
import { useHashRoute } from '@/hooks/useHashRoute';
import { cx } from '@/utils/method';

const DynamicTabCash = dynamic(() => import('./_components/tabs/Cash.client'), {
  ssr: false,
});

const DynamicTabCharging = dynamic(
  () => import('./_components/tabs/Charging.client'),
  {
    ssr: false,
  }
);

export default function CashClient() {
  const t = useTranslations('introduction');

  const [activeTab, setActiveTab] = useHashRoute('cash');

  return (
    <div className={cx('flex min-h-full flex-col')}>
      <Header
        pageTitle={t('title')}
        showBackButton
        className="sticky top-0 z-50 border-b border-gray-80"
      />

      <div className="flex flex-col gap-8 bg-gray-90 p-16">
        <div className="flex items-center justify-between rounded-8 border-gray-80 bg-white p-16">
          <span className="text-14 font-semibold">{t('holding')}</span>
          <span className="text-20 font-medium text-primary">0</span>
        </div>
      </div>

      <MenuTab
        className={cx(activeTab === 'episodes' && 'sticky top-56 z-50')}
        onTabChange={key => {
          setActiveTab(key);
        }}
        tabs={[
          {
            key: 'cash',
            label: t('tabs.cash'),
          },
          {
            key: 'charging',
            label: t('tabs.charging'),
          },
        ]}
        activeTab={activeTab}
      />
      {activeTab === 'cash' && <DynamicTabCash />}
      {activeTab === 'charging' && <DynamicTabCharging />}
    </div>
  );
}
