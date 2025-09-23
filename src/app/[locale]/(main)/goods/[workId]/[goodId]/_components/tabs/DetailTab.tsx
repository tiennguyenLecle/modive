import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { AutoImage, Button } from '@/components';
import { GoodType } from '@/types/goods';
import { getPublicUrl } from '@/utils/method';

type DetailTabProps = {
  good: GoodType & { is_liked: boolean };
};

const DetailTab = ({ good }: DetailTabProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const t = useTranslations('goods_page.good_detail.tabs.detail');

  return (
    <div className="flex flex-col gap-16 p-16">
      <AutoImage src={getPublicUrl(good.thumbnail_key)} alt={good.title} />
      <div className="px-16">
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
