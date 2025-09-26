import OrderDetail from './_components/OrderDetail.Client';

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  console.log(id);

  return (
    <div data-no-navigation>
      <OrderDetail id={id} />
    </div>
  );
}
