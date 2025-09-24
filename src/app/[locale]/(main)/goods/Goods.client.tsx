'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ArrowRight, Heart } from '@/assets/icons';
import { useGoodLike, useWorksWithGoods } from '@/hooks/useGoods';
import { useAuth } from '@/lib/authentication/auth-context';
import { Link } from '@/lib/navigation';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { cx } from '@/utils/method';

type Props = {};

const GoodsClient = (props: Props) => {
  const t = useTranslations();
  const supabase = useMemo(() => createBrowserSupabase('user'), []);
  const { data: works, mutate: mutateWorks } = useWorksWithGoods(supabase);

  const { user, checkAvailableUser } = useAuth();
  const { trigger: toggleGoodLike } = useGoodLike(supabase, user?.id || '');

  return (
    <>
      <div className="h-full w-full overflow-y-auto">
        {works?.data?.map((work, index) => (
          <div key={work.work_id}>
            {index !== 0 && <div className="mx-16 mb-8 mt-12 h-1 bg-gray-90" />}
            <Link
              className={cx(
                'transition-300 mx-8 mb-4 flex cursor-pointer items-center justify-between gap-8 rounded-8 p-8 transition-colors hover:bg-gray-90/50',
                index === 0 && 'mt-8'
              )}
              href={`/goods/${work.work_id}`}
            >
              <h2
                className="line-clamp-1 text-20 font-medium text-gray-00"
                title={work.work_title}
              >
                {work.work_title}
              </h2>
              <ArrowRight
                className="shrink-0 text-gray-00"
                width={24}
                height={24}
              />
            </Link>

            {/* Line 2: List of goods thumbnails */}
            <div className="no-scrollbar mx-8 flex items-start gap-2 overflow-x-auto px-8">
              {work.goods.map(good => (
                <Link
                  key={good.id}
                  className="transition-300 box-content flex w-120 flex-col gap-12 rounded-4 p-4 transition-colors hover:bg-gray-90/50"
                  href={`/goods/${work.work_id}/${good.id}`}
                  title={good.title}
                >
                  <div
                    className={
                      'rounded relative aspect-square w-120 overflow-hidden rounded-4 border border-gray-80 bg-gray-100'
                    }
                  >
                    {good.thumbnail_key ? (
                      <Image
                        src={
                          supabase.storage
                            .from('medias') // adjust bucket name
                            .getPublicUrl(good.thumbnail_key).data.publicUrl
                        }
                        alt={good.title ?? 'Good thumbnail'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-xs text-gray-500 flex h-full w-full items-center justify-center">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <p
                      title={good.title}
                      className="truncate text-16 font-normal -tracking-0.5 text-gray-00"
                    >
                      {good.title}
                    </p>
                    <Heart
                      className={cx(
                        'shrink-0 transition-colors duration-200 hover:stroke-primary hover:text-primary',
                        good.is_liked
                          ? 'stroke-primary text-primary'
                          : 'stroke-gray-30 text-white'
                      )}
                      width={24}
                      height={24}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        checkAvailableUser({
                          description: t(
                            'goods_page.good_detail.alert_sign_up.like'
                          ),
                        }).then(() => {
                          toggleGoodLike({
                            isLiked: good.is_liked,
                            goodId: good.id,
                          }).then(() => mutateWorks());
                        });
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GoodsClient;
