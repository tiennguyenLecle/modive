export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="container flex h-full items-center justify-center py-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Photo {params.id}</h1>
        <img
          src={`https://picsum.photos/seed/${params.id}/600`}
          alt={`Photo ${params.id}`}
          className="max-w-full rounded-lg"
        />
      </div>
    </div>
  );
}
