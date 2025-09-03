import React, { useImperativeHandle, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button, Header } from '@/components';
import { CommentType } from '@/types/comment';
import { WorkType } from '@/types/work';

import { useComments } from '../../_hooks/useComments';

type CommentFormProps = {
  createComment: ReturnType<typeof useComments>['createComment'];
  updateComment: ReturnType<typeof useComments>['updateComment'];
  workDetail: WorkType;
};

type CommentFormRef = {
  open: (comment?: CommentType) => void;
  close: () => void;
};

const CommentForm = React.forwardRef<CommentFormRef, CommentFormProps>(
  ({ createComment, updateComment, workDetail }, ref) => {
    const t = useTranslations('introduction.community');

    const oldContent = useRef<string>('');
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState<CommentType>();

    const closeHandler = () => {
      setComment(undefined);
      setContent('');
      oldContent.current = '';
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: comment => {
        if (comment) {
          setComment(comment);
          setContent(comment.content);
          oldContent.current = comment.content;
        }
        setIsOpen(true);
      },
      close: closeHandler,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (comment?.content?.trim() === '') return;
      try {
        if (comment?.id) {
          updateComment.trigger({ comment, content });
        } else {
          createComment.trigger({ content });
        }
        closeHandler();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="absolute inset-0 bg-white/50 p-16"></div>

            <motion.div
              variants={{
                hidden: {
                  scale: 0,
                  opacity: 0,
                  transformOrigin: 'bottom right',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transformOrigin: 'bottom right',
                  transition: { duration: 0.3, ease: 'easeInOut' },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 -mt-56 bg-white"
            >
              <div className="relative flex h-full flex-col">
                <Header
                  pageTitle={comment?.id ? t('edit_comment') : t('new_comment')}
                  showBackButton
                  className="h-56 border-b border-gray-80"
                  onClickBackButton={closeHandler}
                />

                <div className="flex h-full flex-col gap-12 p-16">
                  <h3 className="text-16 font-semibold text-gray-30">
                    {workDetail?.title}
                  </h3>
                  <p className="text-14 font-semibold text-gray-50">
                    by. {comment?.user.name}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col justify-between"
                  >
                    <div className="flex flex-col gap-12">
                      <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder={t('placeholder')}
                        className="bg-gray-900 h-200 overflow-hidden rounded-12 border border-gray-70 p-16 focus:outline-primary"
                        maxLength={200}
                      />
                      <span className="mt-8 self-end text-14 text-gray-40">
                        {content.length}/200
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="h-60 shrink-0 text-20"
                      disabled={
                        !content.trim() ||
                        createComment.isMutating ||
                        updateComment.isMutating ||
                        oldContent.current === content
                      }
                      loading={
                        createComment.isMutating || updateComment.isMutating
                      }
                    >
                      {comment?.id ? t('save') : t('completion')}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

CommentForm.displayName = 'CommentForm';

export default CommentForm;
