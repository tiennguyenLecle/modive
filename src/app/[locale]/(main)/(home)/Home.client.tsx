'use client';

import Image from 'next/image';
import useSWR from 'swr';

import { Work } from '@/components';
import { createBrowserSupabase } from '@/lib/supabase/factory';
import { fetchInterface, INTERFACE_KEY } from '@/lib/supabase/swr/interface';
import { InterfaceType } from '@/types/interface';
import { getPublicUrl } from '@/utils/method';

type HomeProps = {
  fallbackData: InterfaceType;
};

export default function HomeClient({ fallbackData }: HomeProps) {
  const supabase = createBrowserSupabase('user');

  const { data: interfaceData } = useSWR(
    INTERFACE_KEY,
    () => fetchInterface(supabase),
    {
      fallbackData,
      revalidateOnMount: false,
    }
  );

  if (!interfaceData) return;

  return (
    <div>
      <div className="relative aspect-[9/5]">
        <Image
          src={getPublicUrl(interfaceData.data.banner_key)}
          alt="Modive banner"
          fill
        />
      </div>
      <div className="flex flex-col gap-12 bg-gray-100 py-16">
        {interfaceData.data.blocks.map((block, index) => (
          <Work.Group
            key={`${block.title}-${index}`}
            groupTitle={block.title}
            blocks={block.sub_blocks.map(subBlock => subBlock.work)}
          />
        ))}
      </div>
    </div>
  );
}
