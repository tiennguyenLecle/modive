import GoodDetail from '@/app/[locale]/(main)/goods/[workId]/[goodId]/_components/GoodDetail';
import { Header } from '@/components';

type Props = {
  params: { workId: string; goodId: string };
};

const GoodDetailPage = (props: Props) => {
  const { params } = props;
  const { workId, goodId } = params;

  return (
    <div data-no-navigation>
      <Header
        title="Good Detail"
        showBackButton
        showCartIcon
        className="border-b border-gray-80"
      />
      <div className="no-scrollbar h-[calc(100vh-56px)] overflow-auto">
        <GoodDetail goodId={goodId} workId={workId} />
      </div>
    </div>
  );
};

export default GoodDetailPage;
