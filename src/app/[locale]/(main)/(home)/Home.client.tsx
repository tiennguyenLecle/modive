'use client';

import { Carousel } from 'antd';
import Image from 'next/image';

import { Work } from '@/components';
import { Link } from '@/lib/navigation';
import { InterfaceType } from '@/types/interface';
import { ROUTES } from '@/utils/constants';
import { getPublicUrl, hasFields } from '@/utils/method';

type HomeProps = {
  interfaceData?: InterfaceType;
};

export default function HomeClient({ interfaceData }: HomeProps) {
  if (!interfaceData) return;

  return (
    <div>
      <div className="aspect-[9/5] w-full overflow-hidden">
        <Carousel autoplay draggable>
          {interfaceData.banner_storage_objects?.map(({ key, url }) =>
            url ? (
              <Link
                key={key}
                href={url}
                target="_blank"
                className="relative aspect-[9/5]"
              >
                <Image
                  src={getPublicUrl(key)}
                  alt="Moit banner"
                  fill
                  className="object-cover"
                />
              </Link>
            ) : (
              <div key={key} className="relative aspect-[9/5]">
                <Image
                  src={getPublicUrl(key)}
                  alt="Moit banner"
                  fill
                  className="object-cover"
                />
              </div>
            )
          )}
        </Carousel>
      </div>
      <div className="flex flex-col gap-12 bg-gray-100 py-16">
        {interfaceData?.blocks?.map((block, index) => (
          <div key={`${block?.title}-${index}`} className="pb-12 pt-16">
            <h2 className="mb-16 flex items-center gap-8 px-16 text-20 font-medium text-gray-00">
              {/* <span className="text-20 font-bold text-primary">모다이브</span> */}
              {block?.title}
            </h2>
            <div className="no-scrollbar flex items-start gap-4 overflow-x-auto pl-12">
              {block?.sub_blocks?.map(({ work_id, work }) =>
                hasFields(work, [
                  'id',
                  'title',
                  'thumbnail_key',
                  'characters',
                ]) ? (
                  <Link
                    key={work_id}
                    href={{
                      pathname: ROUTES.INTRODUCTION,
                      query: { workId: work_id },
                    }}
                  >
                    <Work.Item
                      title={work.title}
                      bannerImg={getPublicUrl(work.thumbnail_key ?? '')}
                      characters={work.characters}
                    />
                  </Link>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
