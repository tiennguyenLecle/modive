import React, { ComponentProps } from 'react';
import dayjs from 'dayjs';
import { useFormatter, useTranslations } from 'next-intl';

import { Info } from '@/assets/icons';
import { cx } from '@/utils/method';

type PreOrderInfoProps = ComponentProps<'div'> & {
  isPreSale?: boolean | null;
  releaseDate?: string | null;
};

const PreOrderInfo: React.FC<PreOrderInfoProps> = ({
  isPreSale,
  releaseDate,
  className,
  ...props
}) => {
  const formatter = useFormatter();
  const t = useTranslations('goods_page.good_detail');
  if (!isPreSale && !releaseDate) return null;

  return (
    <div
      className={cx(
        'flex-start mt-16 flex gap-4 rounded-4 border border-gray-80 bg-gray-90 px-8 py-12',
        className
      )}
      {...props}
    >
      <Info className="text-gray-60" width={18} height={18} />
      <p>
        {isPreSale && (
          <>
            {t('pre_sale_badge')}
            <br />
          </>
        )}
        {releaseDate &&
          t('pre_sale_description', {
            release_date: formatter.dateTime(new Date(releaseDate), {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          })}
      </p>
    </div>
  );
};

export default PreOrderInfo;
