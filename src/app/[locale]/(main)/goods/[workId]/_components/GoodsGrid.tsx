import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { Heart } from '@/assets/icons';
import { GoodType } from '@/types/goods';
import { cx, getPublicUrl } from '@/utils/method';

type GoodsGridProps = {
  workId: string;
  goods: Array<GoodType & { is_liked: boolean }>;
};

const GoodsGrid = async (props: GoodsGridProps) => {
  const { workId, goods } = props;

  const t = await getTranslations({ namespace: 'goods_page' });

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-12 py-8">
      {goods.map(good => (
        <Link
          key={good.id}
          href={`/goods/${workId}/${good.id}`}
          className="transition-300 rounded-4 p-4 transition-colors hover:bg-gray-90/50"
          title={good.title}
        >
          <div className="relative mb-12 aspect-square w-full overflow-hidden rounded-4 border border-gray-80">
            <Image
              src={getPublicUrl(good.thumbnail_key)}
              alt={
                good.title ||
                t('good_detail.good_thumbnail_alt', { title: good.title })
              }
              fill
              className="rounded-4 bg-gray-90"
            />
          </div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="truncate text-16 font-normal -tracking-0.5 text-gray-00">
              {good.title}
            </p>
            <Heart
              className={cx(
                'shrink-0',
                good.is_liked
                  ? 'stroke-primary text-primary'
                  : 'stroke-gray-30 text-white'
              )}
              width={24}
              height={24}
            />
          </div>
          <p className="text-16 font-semibold -tracking-0.5 text-gray-00">
            {good.price?.toLocaleString()} won
          </p>
        </Link>
      ))}
    </div>
  );
};

export default GoodsGrid;
