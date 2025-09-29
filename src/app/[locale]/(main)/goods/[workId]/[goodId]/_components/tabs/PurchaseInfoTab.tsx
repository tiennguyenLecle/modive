import React, { ComponentProps } from 'react';

import { GoodPlusType } from '@/types/goods';
import { cx } from '@/utils/method';

import { useGoodDetailProvider } from '../../_provider/GoodDetailProvider';
import styles from './PurChaseInfoTab.module.scss';

type PurchaseInfoTabProps = ComponentProps<'div'> & {};

const PurchaseInfoTab = ({ className, ...props }: PurchaseInfoTabProps) => {
  const { goodDetail } = useGoodDetailProvider();

  if (!goodDetail.data) return null;

  const { delivery_fee } = goodDetail.data;

  return (
    <div className={cx(styles.purchaseInfoTab, className)} {...props}>
      <h3>결제정보</h3>
      <p>
        결제수단 : 신용카드, 카카오페이, 토스페이(토스페이먼츠 제공) 타인 명의의
        주문, 비정상적인 주문 등으로 판단되는 경우 회사는 주문을 취소하거나
        보류할 수 있습니다.
      </p>
      <br />
      <h3>배송정보</h3>
      <p>
        배송 방법 : 택배
        <br />
        배송 지역 : 전국 (일부 도서·산간 지역 제외)
        <br />
        {delivery_fee && (
          <>
            배송 비용 : {delivery_fee.toLocaleString()}원
            <br />
          </>
        )}
        배송 기간 : 결제일로부터 3일 ~ 7일 이내 발송
        <br />
        배송 안내 : 일부 도서·산간 지역은 추가 배송비가 부과될 수 있으며, 주문서
        작성 시 배송지 입력 후 확인 가능합니다.
      </p>
      <br />
      <ul>
        <li>
          상품 재고 상황, 물류센터 사정에 따라 배송이 다소 지연될 수 있습니다.
        </li>
        <li>예약판매·주문제작 상품은 모든 상품이 준비된 후 함께 배송됩니다.</li>
        <li>
          주문 상품이 품절되어 출고가 불가능한 경우, 고객센터에서 개별
          안내드립니다.
        </li>
      </ul>
      <br />
      <h3>교환 및 반품 안내</h3>
      <ul>
        <li>
          마이페이지 &gt; 고객센터 &gt; 1:1 문의 또는 고객센터 접수를 통해 신청
          가능합니다.
        </li>
        <li>
          주문번호, 상품 바코드, 반송 사유를 필수 기재해야 하며, 교환·반품 사유
          확인을 위한 사진 또는 동영상 첨부 시 빠른 처리가 가능합니다. 상품은
          받으신 포장(박스, 폴리백 등) 그대로 재포장하여 반송해 주셔야 합니다.
        </li>
        <li>
          상품 수령일로부터 7일 이내 신청 가능하며, 표시·광고 내용과 상이하거나
          제품 하자의 경우 수령 후 3개월 이내 또는 사실 확인일로부터 30일 이내
          신청할 수 있습니다. 분실·누락 건은 수령일 기준 30일 이내 접수가
          필요합니다.
        </li>
        <li>
          단순 변심으로 인한 반품·교환 시 왕복 배송비는 고객 부담이며, 상품
          불량·오배송의 경우 회사가 부담합니다. 반품 전 반드시 고객센터 사전
          접수가 필요하며, 임의 반송 시 정상 처리되지 않습니다.
        </li>
        <li>
          소비자 책임으로 인한 상품 손실·훼손, 사용 또는 개봉으로 인한 상품 가치
          하락, 시간 경과로 재판매가 곤란할 정도의 상품 가치 감소, 주문제작
          상품, 복제 가능 상품(CD/LP, DVD/Blu-ray, 잡지, 화보집, 사진 등) 포장
          훼손, 디지털 콘텐츠 제공이 시작된 경우, 기타 전자상거래법 및
          소비자보호법상 청약철회 제한 사유에 해당하는 경우는 교환·반품이
          불가합니다.
        </li>
      </ul>
      <br />
      <h3>소비자 피해보상</h3>
      <ul>
        <li>
          상품 불량으로 인한 반품·교환·A/S·환불 등은
          소비자분쟁해결기준(공정거래위원회 고시)에 따라 처리됩니다.
        </li>
      </ul>
      <br />
      <h3>환불 지연 배상</h3>
      <ul>
        <li>
          환불 지연 시 전자상거래법 및 토스페이먼츠 규정에 따른 지연 배상금이
          지급됩니다.
        </li>
      </ul>
    </div>
  );
};

export default PurchaseInfoTab;
