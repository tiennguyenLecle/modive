'use client';

import { useCMSInterface } from '@/lib/context/CMSInterface';

export default function MobilePreview() {
  const { heroBanner, contentBlocks } = useCMSInterface();

  return (
    <div className="rounded w-[360px] border bg-white p-2">
      {heroBanner && (
        <img src={heroBanner} alt="Hero Banner" className="w-full" />
      )}
      {contentBlocks.map(block => (
        <div key={block.id} className="p-2">
          <h3 className="font-bold">{block.title}</h3>
          {/* Render sub blocks */}
        </div>
      ))}
    </div>
  );
}
