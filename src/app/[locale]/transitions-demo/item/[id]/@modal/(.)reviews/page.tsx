import { ModalWrapper } from '@/components/ModalWrapper';

export default function ReviewsModal({ params }: { params: { id: string } }) {
  return (
    <ModalWrapper>
      <div className="bg-card text-card-foreground rounded-lg w-[600px] max-w-[90vw] p-8">
        <h1 className="text-2xl mb-4 font-bold">
          Reviews for Item {params.id}
        </h1>
        <ul>
          <li>Review 1: Great product!</li>
          <li>Review 2: Would buy again.</li>
          <li>Review 3: Fast shipping.</li>
        </ul>
      </div>
    </ModalWrapper>
  );
}
