import { ComponentProps, useState } from 'react';
import { useTranslations } from 'next-intl';

import { AutoImage, Button } from '@/components';
import { cx, getPublicUrl } from '@/utils/method';

import { useGoodDetailProvider } from '../../_provider/GoodDetailProvider';

type DetailTabProps = ComponentProps<'div'> & {};

const DetailTab = ({ className, ...props }: DetailTabProps) => {
  const t = useTranslations('goods_page.good_detail.tabs.detail');
  const { goodDetail } = useGoodDetailProvider();
  const [isShowMore, setIsShowMore] = useState(false);

  if (!goodDetail.data) return null;
  const { detail_storage_objects, title } = goodDetail.data;

  return (
    <div
      className={cx(
        'flex flex-col items-center overflow-hidden px-16 pb-96 pt-16',
        className,
        !isShowMore && 'h-full'
      )}
      {...props}
    >
      {detail_storage_objects.map(storageObject => (
        <AutoImage
          key={storageObject.key}
          src={getPublicUrl(storageObject.key)}
          alt={title}
        />
      ))}
      <div
        className="fixed bottom-80 z-50 -ml-16 w-full max-w-768 self-stretch px-16 pb-16 pt-40"
        style={{
          background:
            'linear-gradient(181deg, rgba(255, 255, 255, 0.00) 2.98%, #FFF 46.02%)',
        }}
      >
        <Button
          variant="secondary"
          className="px-8 py-16"
          onClick={() => setIsShowMore(!isShowMore)}
        >
          {isShowMore ? t('show_less') : t('show_more')}
        </Button>
      </div>
    </div>
  );
};

export default DetailTab;
