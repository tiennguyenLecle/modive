import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { getPublicUrl } from '@/utils/method';

import Empty from '../Empty';
import { useWork } from '../WorkProvider';

export default function TabRelationship() {
  const { workDetail } = useWork();
  const t = useTranslations('introduction.relationship');

  return workDetail && workDetail.characters_map_key ? (
    <div className="container">
      <div className="relative aspect-square">
        <Image
          src={getPublicUrl(workDetail.characters_map_key)}
          alt={`${workDetail.title} characters map`}
          className="object-contain"
          fill
        />
      </div>
    </div>
  ) : (
    <Empty message={t('no_relationship_data')} className="min-h-200" />
  );
}
