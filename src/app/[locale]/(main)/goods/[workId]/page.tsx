import { getTranslations } from 'next-intl/server';

import GoodsGrid from '@/app/[locale]/(main)/goods/[workId]/_components/GoodsGrid';
import { Header } from '@/components';
import { createServerSupabase } from '@/lib/supabase/factory.server';
import { fetchWorkGoods } from '@/lib/supabase/swr/goods';

export async function generateMetadata({
  params,
}: {
  params: { workId: string };
}) {
  const t = await getTranslations('goods_page.work.metadata');
  const { workId } = params;
  const supabase = createServerSupabase('user');
  const workGoods = await fetchWorkGoods(supabase, workId);
  // const res = await ChatApi.getMessages(chatroomId);
  return {
    title: t('title', { workTitle: workGoods.work_title }),
  };
}

type ListGoodsWithWorkIdProps = {
  params: { workId: string };
};

const ListGoodsWithWorkId = async (props: ListGoodsWithWorkIdProps) => {
  const { params } = props;
  const { workId } = params;
  const supabase = createServerSupabase('user');
  const workGoods = await fetchWorkGoods(supabase, workId);

  return (
    <>
      <Header
        pageTitle={workGoods.work_title}
        showSearchIcon
        showCartIcon
        showBackButton
        className="border-b border-gray-80"
      />
      <main>
        <GoodsGrid workId={workId} goods={workGoods.goods} />
      </main>
    </>
  );
};

export default ListGoodsWithWorkId;
