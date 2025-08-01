import Link from 'next/link';

export default function ItemDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container py-8">
      <Link
        href="/transitions-demo"
        className="text-blue-500 mb-4 inline-block hover:underline"
      >
        &larr; Back to list
      </Link>
      <h1 className="text-2xl font-bold">Item {params.id}</h1>
      <p className="mt-4">This is the detail page for item {params.id}.</p>

      <div className="mt-8">
        <Link
          href={`/transitions-demo/item/${params.id}/reviews`}
          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white"
        >
          Show Reviews (Local Modal)
        </Link>
      </div>
    </div>
  );
}
