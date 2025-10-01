'use client';

import { useState } from 'react';
import { Collapse } from 'antd';
import { useTranslations } from 'next-intl';

import { ChevronDown } from '@/assets/icons';
import { Button } from '@/components';
import { useRouter } from '@/lib/navigation';

import styles from './FAQ.module.scss';

const { Panel } = Collapse;

const faqData = [
  {
    key: '1',
    question: '언제 배송 받을 수 있나요?',
    answer:
      '배송 예정일은 주문조회를 통해 직접 확인할 수 있습니다.\n\n배송조회 후 상단 ‘자세히 보기’를 클릭하면 시간대 별 배송현황을 확인할 수 있습니다.\n\n배송 메시지는 모바일앱 홈 오른쪽 상단 알림센터에서도 확인이 가능합니다.\n\n배송 예정일은 판매자 및 배송지에 따라 차이가 있으며, 도서산간 지역 등은 3~5일 더 소요될 수 있습니다.\n\n악천후, 천재지변, 물량 수급 변동, 명절 연휴 등 예외적인 사유가 발생하면 다소 지연될 수 있는 점 양해 부탁드립니다.',
    isExpanded: false,
  },
  {
    key: '2',
    question: '운송장 확인은 어떻게 할 수 있나요?',
    answer:
      '배송 예정일은 주문조회를 통해 직접 확인할 수 있습니다.\n\n배송조회 후 상단 ‘자세히 보기’를 클릭하면 시간대 별 배송현황을 확인할 수 있습니다.\n\n배송 메시지는 모바일앱 홈 오른쪽 상단 알림센터에서도 확인이 가능합니다.\n\n배송 예정일은 판매자 및 배송지에 따라 차이가 있으며, 도서산간 지역 등은 3~5일 더 소요될 수 있습니다.\n\n악천후, 천재지변, 물량 수급 변동, 명절 연휴 등 예외적인 사유가 발생하면 다소 지연될 수 있는 점 양해 부탁드립니다.',
    isExpanded: true,
  },
  {
    key: '3',
    question: '{배송 FAQ}',
    answer:
      '배송 예정일은 주문조회를 통해 직접 확인할 수 있습니다.\n\n배송조회 후 상단 ‘자세히 보기’를 클릭하면 시간대 별 배송현황을 확인할 수 있습니다.\n\n배송 메시지는 모바일앱 홈 오른쪽 상단 알림센터에서도 확인이 가능합니다.\n\n배송 예정일은 판매자 및 배송지에 따라 차이가 있으며, 도서산간 지역 등은 3~5일 더 소요될 수 있습니다.\n\n악천후, 천재지변, 물량 수급 변동, 명절 연휴 등 예외적인 사유가 발생하면 다소 지연될 수 있는 점 양해 부탁드립니다.',
    isExpanded: false,
  },
];

export default function FAQ() {
  const t = useTranslations('ordering');
  const [activeKeys, setActiveKeys] = useState<string[]>(['2']);
  const router = useRouter();

  const handleChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  const customExpandIcon = () => {
    return <ChevronDown />;
  };

  return (
    <div className="rounded-lg bg-white p-4 px-16">
      <h5 className="flex flex-row items-center gap-8 py-16 text-16 font-semibold text-gray-00">
        {t('faq_title')}
      </h5>
      <Collapse
        activeKey={activeKeys}
        onChange={handleChange}
        expandIcon={customExpandIcon}
        expandIconPosition="end"
        className={styles.faqCollapse}
      >
        {faqData.map(item => (
          <Panel
            key={item.key}
            header={
              <div>
                <span
                  className={`${activeKeys.includes(item.key) ? 'text-red-500' : 'text-gray-900'}`}
                >
                  {item.question}
                </span>
              </div>
            }
            className="faq-panel"
          >
            <div className="pt-2">
              {activeKeys.includes(item.key) && (
                <div className="leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          </Panel>
        ))}
      </Collapse>
      <div className="mb-16 flex flex-row items-center justify-end">
        <Button
          variant="secondary"
          className="!w-fit"
          onClick={() => {
            router.push('http://pf.kakao.com/_xkxlgkn');
          }}
        >
          {t('customer_service_btn')}
        </Button>
      </div>
    </div>
  );
}
