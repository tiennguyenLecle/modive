export default function ReviewsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container flex h-full items-center justify-center py-8">
      <div className="bg-card text-card-foreground rounded-lg flex flex-col items-center gap-4 border p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Reviews for Item {params.id}</h1>
        <ul>
          <li>Review 1: Great product!</li>
          <li>Review 2: Would buy again.</li>
          <li>Review 3: Fast shipping.</li>
        </ul>
      </div>
    </div>
  );
}
