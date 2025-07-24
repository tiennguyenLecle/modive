import { Link } from 'next-view-transitions';

export default function TransitionsDemoPage() {
  const items = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="container py-8">
      <h1 className="text-2xl mb-4 font-bold">Transitions Demo</h1>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <Link
            key={item}
            href={`/transitions-demo/item/${item}`}
            className="bg-card text-card-foreground hover:bg-muted rounded-lg border p-4 shadow-sm transition-colors"
          >
            Item {item}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl mb-4 font-bold">Photo Gallery (Global Modal)</h2>
        <div className="flex gap-4">
          <Link href="/photos/1">
            <img
              src="https://picsum.photos/seed/1/150"
              alt="Photo 1"
              className="rounded-lg"
            />
          </Link>
          <Link href="/photos/2">
            <img
              src="https://picsum.photos/seed/2/150"
              alt="Photo 2"
              className="rounded-lg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
