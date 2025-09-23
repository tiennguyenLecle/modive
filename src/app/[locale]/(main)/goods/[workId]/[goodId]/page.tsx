import Image from 'next/image';

import GoodDetail from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/GoodDetail';
import { Header } from '@/components';
import { getServerAuth } from '@/lib/authentication/server-auth';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchGoodDetail } from '@/lib/supabase/swr/goods';
import { getPublicUrl } from '@/utils/method';

type Props = {
  params: { workId: string; goodId: string };
};

const GoodDetailPage = async (props: Props) => {
  const { params } = props;
  const { workId, goodId } = params;
  const user = await getServerAuth();

  const supabase = createServerSupabase('user');

  const goodDetail = await fetchGoodDetail(supabase, goodId, user?.id);

  return (
    <div data-no-navigation>
      <Header title="Good Detail" showBackButton showCartIcon />
      <div className="no-scrollbar h-[calc(100vh-56px)] overflow-auto">
        <div className="relative aspect-[360/232] w-full">
          <Image
            src={getPublicUrl(goodDetail.thumbnail_key || '')}
            alt={goodDetail.title}
            priority
            className="object-cover"
            fill
          />
        </div>
        <GoodDetail goodDetail={goodDetail} workId={workId} />
      </div>
    </div>
  );
};

export default GoodDetailPage;
