import { DefaultImage } from '@/assets/icons';

export default function DefaultImageComponent({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-8 border border-gray-70 bg-white ${className}`}
    >
      <DefaultImage />
    </div>
  );
}
