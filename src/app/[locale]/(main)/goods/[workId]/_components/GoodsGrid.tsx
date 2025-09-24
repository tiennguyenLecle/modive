'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Heart } from '@/assets/icons';
import { useGoodLike, useWorkGoods } from '@/hooks/useGoods';
import { useAuth } from '@/lib/authentication/auth-context';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { cx, getPublicUrl } from '@/utils/method';

type GoodsGridProps = {
  workId: string;
};

const GoodsGrid = (props: GoodsGridProps) => {
  const { workId } = props;
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const { checkAvailableUser } = useAuth();
  const t = useTranslations('goods_page');
  const router = useRouter();

  const { data: workGoods, mutate: mutateGoods } = useWorkGoods(
    supabase,
    workId
  );

  const { user } = useAuth();
  const { trigger: toggleGoodLike } = useGoodLike(supabase, user?.id || '');

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-12 py-8">
      {workGoods?.goods.map(good => (
        <div
          key={good.id}
          onClick={() => router.push(`/goods/${workId}/${good.id}`)}
          className="transition-300 cursor-pointer rounded-4 p-4 transition-colors hover:bg-gray-90/50"
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
              className="rounded-4 bg-gray-90 object-cover"
            />
          </div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="truncate text-16 font-normal -tracking-0.5 text-gray-00">
              {good.title}
            </p>
            <Heart
              className={cx(
                'shrink-0 cursor-pointer',
                good.is_liked
                  ? 'stroke-primary text-primary'
                  : 'stroke-gray-30 text-white'
              )}
              width={24}
              height={24}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                checkAvailableUser({
                  description: t('good_detail.alert_sign_up.like'),
                }).then(() => {
                  toggleGoodLike({
                    isLiked: good.is_liked,
                    goodId: good.id,
                  }).then(() => mutateGoods?.());
                });
              }}
            />
          </div>
          <p className="text-16 font-semibold -tracking-0.5 text-gray-00">
            {t('good_detail.price', {
              price: good.price?.toLocaleString(),
            })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default GoodsGrid;
