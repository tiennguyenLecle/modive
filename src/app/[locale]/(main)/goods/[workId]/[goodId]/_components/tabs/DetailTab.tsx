import { ComponentProps, useState } from 'react';
import { useTranslations } from 'next-intl';

import { AutoImage, Button } from '@/components';
import { GoodPlusType } from '@/types/goods';
import { cx, getPublicUrl } from '@/utils/method';

type DetailTabProps = ComponentProps<'div'> & {
  good: GoodPlusType;
};

const DetailTab = ({ good, className, ...props }: DetailTabProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const t = useTranslations('goods_page.good_detail.tabs.detail');

  return (
    <div
      className={cx(
        'flex flex-col overflow-hidden px-16 pb-96 pt-16',
        className,
        !isShowMore && 'h-full'
      )}
      {...props}
    >
      {good.detail_storage_objects.map(storageObject => (
        <AutoImage
          key={storageObject.key}
          src={getPublicUrl(storageObject.key)}
          alt={good.title}
        />
      ))}
      <div
        className="fixed bottom-80 left-0 right-0 px-16 pb-16 pt-40"
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
