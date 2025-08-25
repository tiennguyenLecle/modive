import React, { useImperativeHandle, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Modal } from '@/components';

import { useComments } from '../../_hooks/useComments';

type ModalDeleteCommentRef = {
  open: (commentId: string) => void;
  close: () => void;
};

type ModalDeleteCommentProps = {
  deleteComment: ReturnType<typeof useComments>['deleteComment'];
};

const ModalDeleteComment = React.forwardRef<
  ModalDeleteCommentRef,
  ModalDeleteCommentProps
>(({ deleteComment }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('introduction.community');
  const commentId = useRef<string | null>(null);

  const closeHandler = () => {
    commentId.current = null;
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: id => {
      commentId.current = id;
      setIsOpen(true);
    },
    close: closeHandler,
  }));

  return (
    <Modal
      open={isOpen}
      onCancel={closeHandler}
      showFooter
      title={t('delete_comment_title')}
      titleAlign="left"
      footer={
        <Button
          variant="secondary"
          onClick={async () => {
            if (commentId.current) {
              deleteComment.trigger({ commentId: commentId.current });
            }
            closeHandler();
          }}
          className="w-full"
          loading={deleteComment.isMutating}
          disabled={deleteComment.isMutating}
        >
          {t('delete')}
        </Button>
      }
    >
      <p className="text-center text-14 font-normal leading-1.66 -tracking-0.5 text-gray-00">
        {t('delete_comment')}
      </p>
    </Modal>
  );
});

ModalDeleteComment.displayName = 'ModalDeleteComment';

export default ModalDeleteComment;
