import GoodDetail from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/GoodDetail';
import { Header } from '@/components';

type Props = {
  params: { workId: string; goodId: string };
};

const GoodDetailPage = (props: Props) => {
  const { params } = props;
  const { workId, goodId } = params;

  return (
    <main data-no-navigation className="flex flex-col">
      <Header
        title="Good Detail"
        showBackButton
        showCartIcon
        className="border-b border-gray-80"
      />
      <div className="no-scrollbar min-h-0 flex-1 overflow-auto">
        <GoodDetail goodId={goodId} workId={workId} />
      </div>
    </main>
  );
};

export default GoodDetailPage;
