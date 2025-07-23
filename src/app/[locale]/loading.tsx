import { Spinner } from '@/components';

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner size={100} />
    </div>
  );
}
