'use client';

import { useTranslations } from 'next-intl';

import { Check, Close, Direction } from '@/assets/icons';
import CheckboxComponent from '@/components/Checkbox';
import { cx } from '@/utils/method';

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

  const unOrderedEpisodes = episodes.filter(ep => !ep.is_ordered);
  const allUnreadSelected =
    unOrderedEpisodes.length > 0 &&
    selectedEpisodes.length === unOrderedEpisodes.length;

  if (episodes.length === 0) return null;

  return (
    <div
      className={cx(
        'sticky top-104 z-50 flex h-40 shrink-0 items-center justify-between border-b border-gray-80 bg-white px-16'
      )}
    >
      {isSelectionMode ? (
        <>
          <CheckboxComponent
            onChange={(event: any) => {
              if (event.target.checked) {
                selectAllEpisodes(episodes);
              } else {
                setSelectedEpisodes([]);
              }
            }}
            checked={allUnreadSelected}
            disabled={episodes.length === 0 || unOrderedEpisodes.length === 0}
          >
            {t('episodes.full_choice')}
          </CheckboxComponent>
          <button
            onClick={() => exitSelectionMode()}
            className="ml-8 mr-auto flex size-24 shrink-0 items-center justify-center transition-colors duration-300 hover:bg-gray-90 hover:text-primary"
            title={t('episodes.exit_full_choice')}
            disabled={episodes.length === 0 || unOrderedEpisodes.length === 0}
          >
            <Close className="size-14" />
          </button>
        </>
      ) : (
        <button
          className="flex items-center gap-4 text-14 font-normal text-gray-00 disabled:text-gray-50"
          onClick={() => setIsSelectionMode(true)}
          disabled={episodes.length === 0 || unOrderedEpisodes.length === 0}
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
    </div>
  );
};

export default EpisodeHeader;
