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
    question: '예약구매 상품은 언제 배송되나요?',
    answer:
      '예약구매 상품은 일반 상품과 달리, 예정된 일정에 따라 일괄 발송됩니다. 따라서, 배송 일정이 일반 상품보다 다소 길어질 수 있으며, 상세한 배송 예정일은 상품 상세 페이지에서 확인하실 수 있습니다.\n\n만약 출고 일정에 변동이 있을 경우, 알림톡 또는 SMS로 별도 안내해 드리겠습니다.',
    isExpanded: false,
  },
  {
    key: '2',
    question: '주문을 취소하고 싶어요.',
    answer:
      '주문하신 상품의 전체 또는 부분 취소는 주문 상태가 ‘배송준비중’일 때만 가능합니다.취소를 원하실 경우, 카카오톡 채널(1:1 문의) 를 통해 요청해 주시면 고객센터에서 확인 후 처리해 드립니다.\n\n한 번 취소된 주문은 철회가 불가하므로 신중히 신청해 주시기 바랍니다. 환불은 취소 접수 후 순차적으로 확인·처리되며, 실제 결제 취소 또는 환급은 영업일 기준 1~3일 이내 결제 수단으로 진행됩니다.\n\n환불 완료 후 최대 7영업일 이내에도 환급 내역이 확인되지 않는 경우, 고객센터(카카오톡 채널)로 문의해 주시기 바랍니다.',
    isExpanded: true,
  },
  {
    key: '3',
    question: '상품을 반품/교환하고 싶어요.',
    answer:
      '상품 수령일로부터 7일 이내에만 반품 또는 교환 신청이 가능합니다.\n신청을 원하실 경우, 카카오톡 채널(1:1 문의) 를 통해 접수해 주시면 고객센터에서 확인 후 처리해 드립니다.\n\n- 반품: 단순 변심의 경우 왕복 배송비는 고객 부담\n- 교환: 동일 상품 내 옵션 교환만 가능하며, 다른 상품으로의 교환은 불가\n\n상품 불량이나 오배송의 경우 배송비는 회사가 부담합니다.',
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
