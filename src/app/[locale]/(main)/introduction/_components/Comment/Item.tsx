import { forwardRef, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Ellipsis, Heart, Pencil, Trash } from '@/assets/icons';
import { useOnClickOutside } from '@/hooks/useClickOutSide';
import { useAuth } from '@/lib/authentication/auth-context';
import { CommentType } from '@/types/comment';
import { cx } from '@/utils/method';

type CommentItemProps = {
  comment: CommentType;
  onLike: (commentId: string, currentLike: boolean) => void;
  onEdit: (comment: CommentType) => void;
  onDelete: (commentId: string) => void;
};

const CommentItem = forwardRef<HTMLDivElement, CommentItemProps>(
  ({ comment, onLike, onEdit, onDelete }, ref) => {
    const t = useTranslations('introduction.community');
    const { user } = useAuth();

    const canEditOrDelete = useMemo(
      () => user?.id === comment.user_id,
      [user, comment.user_id]
    );

    return (
      <div
        ref={ref}
        className={cx(
          'flex gap-12 border-b border-gray-80 bg-white px-24 py-16 opacity-100 transition-opacity duration-200',
          comment._loading && '!opacity-40'
        )}
      >
        <div className="flex flex-1 flex-col gap-12">
          <div className="flex items-center justify-between">
            <p className="text-14 font-semibold text-gray-00">
              by. {comment?.user?.name}
            </p>
          </div>
          <p className="text-wrap text-14 font-normal leading-1.66 -tracking-0.07 text-gray-00">
            {comment?.content}
          </p>
          <span
            onClick={() => onLike(comment.id, comment.is_liked)}
            className="group mr-auto inline-flex cursor-pointer items-center gap-4 text-12 text-gray-30"
          >
            <Heart
              className={cx(
                'size-18 transition-colors duration-200 group-hover:stroke-primary group-hover:text-primary',
                comment?.is_liked
                  ? 'stroke-primary text-primary'
                  : 'stroke-gray-30 text-white'
              )}
            />
            {comment?.total_likes === 0 ? t('like') : comment?.total_likes}
          </span>
        </div>
        {canEditOrDelete && (
          <CommentOptions
            onEdit={() => onEdit(comment)}
            onDelete={() => onDelete(comment.id)}
          />
        )}
      </div>
    );
  }
);

CommentItem.displayName = 'CommentItem';

export default CommentItem;

type CommentOptionsType = {
  onEdit: () => void;
  onDelete: () => void;
};

const CommentOptions = ({ onEdit, onDelete }: CommentOptionsType) => {
  const t = useTranslations('introduction.community');
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className="relative mb-auto" ref={ref}>
      <button
        className="rounded-4 text-gray-50 transition-colors duration-300 hover:bg-gray-90"
        onClick={event => {
          event.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <Ellipsis />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={{
              open: {
                opacity: 1,
                height: 'auto',
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut',
                  when: 'beforeChildren',
                  staggerChildren: 0.05,
                },
              },
              closed: {
                opacity: 0,
                height: 0,
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut',
                  when: 'afterChildren',
                },
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul
              className="absolute right-0 top-full w-200 rounded-l bg-white text-14 text-gray-00"
              style={{ boxShadow: '0 4rem 4rem 0 rgba(0, 0, 0, 0.08)' }}
            >
              <li>
                <button
                  onClick={() => onEdit()}
                  className="line-clamp-1 flex h-48 items-center gap-8 whitespace-nowrap px-16 leading-[48rem] transition-colors duration-300 hover:text-primary"
                >
                  <Pencil width={18} height={18} className="text-gray-00" />
                  {t('modification')}
                </button>
                <button
                  onClick={() => onDelete()}
                  className="line-clamp-1 flex h-48 items-center gap-8 whitespace-nowrap px-16 leading-[48rem] transition-colors duration-300 hover:text-primary"
                >
                  <Trash width={18} height={18} className="text-gray-00" />
                  {t('deletion')}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
