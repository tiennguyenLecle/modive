import { Spinner } from '@/components';

export default function Loading() {
  return (
    <main className="flex h-full items-center justify-center">
      <Spinner size={100} />
    </main>
  );
}
