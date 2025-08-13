'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { HomeHeader, Navigator, StatusBar } from '@/assets/images';
import { useCMSInterface } from '@/lib/context/CMSInterface';

export default function MobilePreview() {
  const t = useTranslations('cms.interface');

  const { heroBanner, contentBlocks } = useCMSInterface();

  return (
    <div className="h-full">
      <label className="text-sm mb-12 block w-200 font-medium">
        {t('preview')}
      </label>
      <div className="rounded flex h-800 w-360 flex-col border bg-white">
        <StatusBar clssName="w-full" />
        <HomeHeader className="w-full" />
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden text-wrap">
          {heroBanner ? (
            <Image
              width={360}
              height={200}
              alt={t('hero_banner')}
              src={heroBanner}
              className="w-full object-cover"
            />
          ) : (
            <div className="flex h-200 min-h-200 w-full items-center justify-center bg-gray-70">
              <span className="text-gray-500">{t('no_banner')}</span>
            </div>
          )}
          <div className="flex flex-col gap-12 py-16">
            {contentBlocks.map(block => (
              <div
                key={block.id}
                className="flex flex-col gap-16 bg-gray-100 py-16"
              >
                <h3 className="px-16 text-20 font-bold text-gray-00">
                  {block.title}
                </h3>
                <div className="flex items-start gap-12 overflow-x-auto px-16">
                  {block.subBlocks.map(subBlock => (
                    <div key={subBlock.id} className="flex flex-col gap-12">
                      <div className="h-80 w-140 overflow-hidden rounded-4 border border-gray-80 bg-gray-70"></div>
                      <div className="flex flex-col gap-8">
                        {subBlock.category ? (
                          <p className="text-16 font-semibold text-gray-00">
                            {subBlock.category}
                          </p>
                        ) : (
                          <div className="h-20 w-90 rounded-4 bg-gray-70"></div>
                        )}
                        <div className="flex flex-col gap-4">
                          {subBlock.content ? (
                            <p className="text-12 font-semibold text-gray-40">
                              {subBlock.content}
                            </p>
                          ) : (
                            <div className="h-20 w-80 rounded-4 bg-gray-80"></div>
                          )}
                          <div className="flex items-center gap-6">
                            <div className="size-24 rounded-max bg-gray-80 shadow-sm"></div>
                            <div className="size-24 rounded-max bg-gray-80 shadow-sm"></div>
                            <div className="size-24 rounded-max bg-gray-80 shadow-sm"></div>
                            <div className="size-24 rounded-max bg-gray-80 shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Navigator className="w-full" />
      </div>
    </div>
  );
}
