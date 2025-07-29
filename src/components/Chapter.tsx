'use client';

import { ComponentProps, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Chevron from '@/assets/icons/chevron.svg';
import Ellipsis from '@/assets/icons/ellipsis.svg';
import Lock from '@/assets/icons/lock.svg';
import Reload from '@/assets/icons/reload.svg';
import { useOnClickOutside } from '@/hooks/useClickOutSide';
import { Link } from '@/lib/navigation';
import { cx } from '@/utils/method';

type ChapterProps = ComponentProps<'div'> & {
  /**
   * Title of the chapter
   */
  title: string;
  /**
   * Image of the chapter
   */
  img: string;
  /**
   * Whether the chapter is locked
   */
  locked?: boolean;
  /**
   * Episodes of the chapter
   */
  episodes: Array<{
    key: string;
    title: string;
    url: string;
    onClick?: () => void;
  }>;
};

const listVariants: Variants = {
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
};

/**
 * Chapter is a component that displays episodes of a story.
 * The episodes are only visible when a unlocked chapter is opened.
 */
export default function Chapter({
  title,
  img,
  locked = false,
  episodes,
  ...props
}: ChapterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div {...props} className="border-b border-gray-90">
      <div
        className={cx(
          'flex items-center gap-12 rounded-s p-16 transition-colors duration-300 hover:text-primary',
          locked ? 'cursor-default' : 'cursor-pointer hover:bg-gray-90/40'
        )}
        onClick={() => !locked && setIsOpen(!isOpen)}
      >
        <div className="relative overflow-hidden rounded-max">
          <Image src={img} alt={title} width={60} height={60} />
          {locked && (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/60 text-gray-70">
              <Lock />
            </div>
          )}
        </div>
        <div className="flex flex-1 items-center gap-4">
          {!locked && (
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.15, ease: 'linear' }}
            >
              <Chevron />
            </motion.div>
          )}
          <h3 className={cx('text-16 font-bold', locked && 'text-gray-50')}>
            {title}
          </h3>
        </div>
        <SeeMoreBtn />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="overflow-hidden py-8 pl-72 text-14">
              {episodes.map(episode => (
                <li
                  key={episode.key}
                  className="h-40 rounded-s bg-white text-14 transition-colors duration-300 hover:bg-gray-90/40 hover:text-primary"
                >
                  <Link
                    href={episode.url}
                    className="line-clamp-1 px-8 leading-[40rem]"
                    onClick={episode.onClick}
                  >
                    {episode.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SeeMoreBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('components.chapter');
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className="relative" ref={ref}>
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
            variants={listVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul
              className="absolute right-0 top-full rounded-l bg-white text-14 text-gray-00"
              style={{ boxShadow: '0 4rem 4rem 0 rgba(0, 0, 0, 0.08)' }}
            >
              <li>
                <Link
                  href="#"
                  className="line-clamp-1 flex h-48 items-center gap-8 whitespace-nowrap px-16 leading-[48rem] transition-colors duration-300 hover:text-primary"
                >
                  <Reload />
                  {t('seeMore')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
