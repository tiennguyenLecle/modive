import React, { useImperativeHandle, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { ArrowRight } from '@/assets/icons';
import { Button } from '@/components';
import { CommentType } from '@/types/comment';

import { useComments } from '../../_hooks/useComments';

type CommentFormProps = {
  createComment: ReturnType<typeof useComments>['createComment'];
  updateComment: ReturnType<typeof useComments>['updateComment'];
};

type CommentFormRef = {
  open: (comment?: Pick<CommentType, 'id' | 'content'>) => void;
  close: () => void;
};

const CommentForm = React.forwardRef<CommentFormRef, CommentFormProps>(
  ({ createComment, updateComment }, ref) => {
    const searchParams = useSearchParams();
    const t = useTranslations('introduction.community');

    const oldContent = useRef<string>('');
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [commentId, setCommentId] = useState<CommentType['id'] | null>(null);

    const workId = searchParams.get('workId') as string;

    const closeHandler = () => {
      setCommentId(null);
      setContent('');
      oldContent.current = '';
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: comment => {
        if (comment) {
          setCommentId(comment.id);
          setContent(comment.content);
          oldContent.current = comment.content;
        }
        setIsOpen(true);
      },
      close: closeHandler,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim() === '') return;
      try {
        if (commentId) {
          updateComment.trigger({
            id: commentId,
            content,
          });
        } else {
          createComment.trigger({ content });
        }
        closeHandler();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
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
                className="absolute inset-0 bg-white p-16"
              >
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder={t('placeholder')}
                    className="bg-gray-900 h-200 overflow-hidden rounded-12 border border-gray-70 p-16 focus:outline-primary"
                    maxLength={200}
                  />
                  <span className="mb-auto mt-8 self-end text-14 text-gray-40">
                    {content.length}/200
                  </span>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-16 h-60 shrink-0 text-20"
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
                    {t('send')}
                  </Button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full left-0 flex h-56 cursor-pointer items-center px-16">
            <ArrowRight
              width={24}
              height={24}
              className="rotate-180 text-gray-00 transition-colors hover:bg-gray-90"
              onClick={closeHandler}
            />
          </div>
        )}
      </>
    );
  }
);

CommentForm.displayName = 'CommentForm';

export default CommentForm;
