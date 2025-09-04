'use client';

import { useTranslations } from 'next-intl';

import { ArrowRight, Check, Direction } from '@/assets/icons';
import CheckboxComponent from '@/components/Checkbox';

import { useEpisodeContext } from './EpisodeProvider';

const EpisodeHeader: React.FC = () => {
  const t = useTranslations('introduction');
  const {
    sortOption,
    setSortOption,
    episodes,
    isSelectionMode,
    selectedEpisodes,
    setSelectedEpisodes,
    setIsSelectionMode,
    selectAllEpisodes,
    exitSelectionMode,
  } = useEpisodeContext();

  const unreadEpisodes = episodes.filter(ep => !ep.is_ordered);
  const allUnreadSelected =
    unreadEpisodes.length > 0 &&
    selectedEpisodes.length === unreadEpisodes.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllEpisodes(episodes);
    } else {
      setSelectedEpisodes([]);
    }
  };

  return (
    <div className="flex h-40 shrink-0 items-center justify-between border-b border-gray-80 px-16">
      {isSelectionMode ? (
        <CheckboxComponent
          onChange={(event: any) => {
            if (event.target.checked) {
              selectAllEpisodes(episodes);
            } else {
              setSelectedEpisodes([]);
            }
          }}
          checked={allUnreadSelected}
          disabled={episodes.length === 0}
        >
          {t('episodes.full_choice')}{' '}
        </CheckboxComponent>
      ) : (
        <button
          className="flex items-center gap-4 text-14 font-normal text-gray-00"
          onClick={() => setIsSelectionMode(true)}
          disabled={episodes.length === 0}
        >
          <span>{t('episodes.selection')}</span>
          <Check className="w-7" />
        </button>
      )}

      <button
        className="flex items-center gap-4 text-14 font-normal text-gray-00"
        onClick={() =>
          setSortOption(sortOption === 'latest' ? 'episode' : 'latest')
        }
        disabled={episodes.length === 0}
      >
        {sortOption === 'latest' && (
          <span>{t('episodes.sort_by.latest_soon')}</span>
        )}
        {sortOption === 'episode' && (
          <span>{t('episodes.sort_by.episode')}</span>
        )}
        <Direction className="size-14 rotate-90" />
      </button>
      {isSelectionMode && (
        <div className="absolute bottom-full left-0 flex h-56 cursor-pointer items-center px-16">
          <ArrowRight
            width={24}
            height={24}
            className="rotate-180 text-gray-00 transition-colors hover:bg-gray-90"
            onClick={() => exitSelectionMode()}
          />
        </div>
      )}
    </div>
  );
};

export default EpisodeHeader;
