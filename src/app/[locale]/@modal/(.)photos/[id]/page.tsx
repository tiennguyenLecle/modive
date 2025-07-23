import { ModalWrapper } from '@/components/ModalWrapper';

export default function PhotoModal({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <ModalWrapper>
      <img
        src={`https://picsum.photos/seed/${id}/600`}
        alt={`Photo ${id}`}
        className="max-h-[90vh] max-w-[90vw] rounded-lg"
      />
    </ModalWrapper>
  );
}
