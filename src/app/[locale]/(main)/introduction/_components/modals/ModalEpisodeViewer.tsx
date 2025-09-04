'use client';

import React, { ComponentProps, useImperativeHandle, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ArrowRight } from '@/assets/icons';
import { Header, Modal, Slider, Spinner } from '@/components';
import { cx } from '@/utils/method';

import { ExtendedEpisodeType } from '../../_actions/episode';
import { useEpisodeContent } from '../../_hooks/useEpisode';
import { useEpisodeContext } from '../Episode';

type EpisodeContent = {
  id: string;
  title: string;
  content: string;
  currentPage: number;
  totalPages: number;
};

type ModalEpisodeViewerRef = {
  open: (selectedEpisode: ExtendedEpisodeType) => void;
  close: () => void;
};

type ModalEpisodeViewerProps = {};

const ModalEpisodeViewer = React.forwardRef<
  ModalEpisodeViewerRef,
  ModalEpisodeViewerProps
>((_, ref) => {
  const t = useTranslations('introduction.episode_viewer');
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: episode => {
      setCurrentEpisodeIndex(
        availableEpisodes.findIndex(e => e.id === episode.id)
      );
      setIsOpen(true);
    },
    close: closeHandler,
  }));

  const { episodes } = useEpisodeContext();

  // Filter ordered episodes and sort by position
  const availableEpisodes = episodes
    .filter(episode => episode.is_ordered)
    .sort((a, b) => a.position - b.position);

  const episodeContents = useEpisodeContent(
    isOpen,
    availableEpisodes.map(episode => episode.id)
  );

  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number | null>(
    null
  );

  const currentEpisode =
    currentEpisodeIndex !== null
      ? {
          ...availableEpisodes[currentEpisodeIndex],
          content:
            episodeContents.data?.[availableEpisodes[currentEpisodeIndex]?.id]
              ?.content,
        }
      : null;

  const closeHandler = () => {
    setIsOpen(false);
    setCurrentEpisodeIndex(null);
  };

  const handleNavigate = (direction: 'prev' | 'next' | number) => {
    if (currentEpisodeIndex === null) return;
    if (typeof direction === 'number') {
      setCurrentEpisodeIndex(direction);
      return;
    }
    if (direction === 'prev') {
      if (currentEpisodeIndex === 0) return;
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    } else {
      if (currentEpisodeIndex === availableEpisodes.length - 1) return;
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const handleProgressChange = (page: number) => {
    setCurrentEpisodeIndex(page);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeHandler}
      containerClassName="!h-full !max-h-full !w-full !max-w-full !rounded-0"
      modalParentClassName="!p-0"
      showCloseButton={false}
      showHeader={false}
      showFooter={false}
    >
      <div className="flex h-full w-full flex-col bg-white">
        <Header
          showBackButton
          pageTitle={currentEpisode?.name}
          onClickBackButton={closeHandler}
          className="border-b border-gray-80"
        />

        {/* Content */}
        {episodeContents.isLoading && (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-16">
          <p className="text-14 font-normal leading-1.66 -tracking-0.5 text-gray-20">
            {currentEpisode?.content}
          </p>
        </div>

        {/* Footer Controls */}
        <div className="border-t border-gray-80 px-16 pb-16 pt-4">
          {availableEpisodes.length > 1 && (
            <div className="flex items-center text-12 text-gray-50">
              <Slider
                className="mr-8 flex-1"
                min={0}
                max={availableEpisodes.length - 1}
                value={currentEpisodeIndex ?? undefined}
                onChange={handleProgressChange}
              />
              <span className="text-primary">
                {currentEpisodeIndex !== null && currentEpisodeIndex + 1}
              </span>
              <span className="mx-2">/</span>
              <span>{availableEpisodes.length}</span>
            </div>
          )}
          <div className="mt-12 flex gap-12">
            <NavigationButton
              onClick={() => handleNavigate(0)}
              className="w-32"
              disabled={
                currentEpisodeIndex === null || currentEpisodeIndex === 0
              }
            >
              <ArrowRight className="inline-block size-14 rotate-180" />
              <ArrowRight className="-ml-8 inline-block size-14 rotate-180" />
            </NavigationButton>
            <NavigationButton
              onClick={() => handleNavigate('prev')}
              className="ml-auto w-48"
              disabled={
                currentEpisodeIndex === null || currentEpisodeIndex === 0
              }
            >
              <ArrowRight className="size-14 rotate-180" />
            </NavigationButton>
            <NavigationButton
              onClick={() => handleNavigate('next')}
              className="mr-auto w-48"
              disabled={
                currentEpisodeIndex === null ||
                currentEpisodeIndex === availableEpisodes.length - 1
              }
            >
              <ArrowRight className="size-14" />
            </NavigationButton>
            <NavigationButton
              onClick={() => handleNavigate(availableEpisodes.length - 1)}
              className="w-32"
              disabled={
                currentEpisodeIndex === null ||
                currentEpisodeIndex === availableEpisodes.length - 1
              }
            >
              <ArrowRight className="inline-block size-14" />
              <ArrowRight className="-ml-8 inline-block size-14" />
            </NavigationButton>
          </div>
        </div>
      </div>
    </Modal>
  );
});

ModalEpisodeViewer.displayName = 'ModalEpisodeViewer';

export default ModalEpisodeViewer;

const NavigationButton = ({
  children,
  className,
  disabled,
  ...props
}: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cx(
        'flex h-32 items-center justify-center rounded-8 border border-gray-80 transition-all duration-200',
        !disabled && 'hover:bg-gray-90 hover:text-primary hover:drop-shadow-sm',
        disabled && 'cursor-not-allowed bg-gray-90 text-gray-60',
        className
      )}
    >
      {children}
    </button>
  );
};
