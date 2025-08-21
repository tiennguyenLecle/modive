'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Toggle } from '@/components';
import { useWorks } from '@/hooks/useWorks';
import { WorkType } from '@/types/work';
import { cx } from '@/utils/method';

import styles from './WorkFilter.module.scss';

interface WorkFilterProps {
  selectedWorkIds: string[];
  onToggleWork: (value: string) => void;
}

const WorkFilter = ({ selectedWorkIds, onToggleWork }: WorkFilterProps) => {
  const t = useTranslations('chat_page');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isViewByWork, setIsViewByWork] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { data: works } = useWorks({ shouldFetch: isViewByWork });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setIsScrolled(scrollLeft > 0);
      setHasMore(clientWidth < scrollWidth - scrollLeft - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [works]);

  return (
    <>
      <div className="container flex h-48 items-center justify-between gap-16 border-b border-gray-90">
        <span>{t('view_by_work')}</span>
        <Toggle.Button onToggle={() => setIsViewByWork(prev => !prev)} />
      </div>
      <AnimatePresence>
        {isViewByWork && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className={styles.workFilterContainer}>
              <div
                className={cx(
                  'no-scrollbar',
                  styles.scrollContainer,
                  isScrolled && styles.scrolled,
                  hasMore && styles.hasMore
                )}
                ref={scrollContainerRef}
              >
                {works?.map((work: WorkType) => (
                  <Toggle.Tab
                    key={work.id}
                    onToggle={() => onToggleWork(work.id)}
                    value={work.id}
                    name={work.title}
                    isActive={selectedWorkIds.includes(work.id)}
                  >
                    #{work.title}
                  </Toggle.Tab>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkFilter;
