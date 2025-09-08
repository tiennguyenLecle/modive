import { forwardRef, useMemo } from 'react';

import { Check, Download } from '@/assets/icons';
import CheckboxComponent from '@/components/Checkbox';
import { cx } from '@/utils/method';

import { ExtendedEpisodeType } from '../../_actions/episode';
import { useEpisodeContext } from './EpisodeProvider';

type EpisodeItemProps = {
  episode: ExtendedEpisodeType;
};

const EpisodeItem = forwardRef<HTMLDivElement, EpisodeItemProps>(
  ({ episode }, ref) => {
    const {
      isSelectionMode,
      handleEpisodeClick,
      handleLongPressStart,
      handleLongPressEnd,
      isEpisodeSelected,
    } = useEpisodeContext();

    const isSelected = isEpisodeSelected(episode.id);

    return (
      <div
        ref={ref}
        className={cx(
          'flex h-90 shrink-0 items-center gap-12 border-b border-gray-80 bg-white px-16 py-8',
          (!isSelectionMode || !episode.is_ordered) &&
            'cursor-pointer transition-colors duration-300 hover:bg-gray-90',
          isSelectionMode && episode.is_ordered && 'cursor-not-allowed'
        )}
        onClick={() => handleEpisodeClick(episode)}
        onTouchStart={() => handleLongPressStart(episode)}
        onTouchEnd={handleLongPressEnd}
      >
        {/* Episode content */}

        {isSelectionMode && (
          <CheckboxComponent
            checked={isSelected}
            disabled={episode.is_ordered}
            className={cx(episode.is_ordered && 'cursor-not-allowed opacity-0')}
          />
        )}
        <h3
          className={cx(
            'cursor-inherit line-clamp-1 text-16 font-semibold text-gray-20',
            isSelectionMode && episode.is_ordered && 'text-gray-50'
          )}
        >
          {episode.name}
        </h3>

        {/* Status icon */}
        <span className="ml-auto flex size-24 flex-shrink-0 items-center justify-center">
          {episode.is_ordered ? (
            <Check className="size-12 text-primary" />
          ) : (
            !isSelectionMode && <Download />
          )}
        </span>
      </div>
    );
  }
);

EpisodeItem.displayName = 'EpisodeItem';

export default EpisodeItem;
