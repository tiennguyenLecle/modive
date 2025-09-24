'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/lib/authentication/auth-context';
import { STORAGE } from '@/utils/constants';

import { ExtendedEpisodeType } from '../../_actions/episode';
import { useEpisodes, useOrderEpisodes } from '../../_hooks/useEpisode';
import ModalEpisodeViewer from '../modals/ModalEpisodeViewer';
import ModalPurchase from '../modals/ModalPurchase';

export type EpisodeStatus = 'unread' | 'read' | 'downloaded';

export type EpisodeContent = {
  id: string;
  title: string;
  content: string;
  currentPage: number;
  totalPages: number;
};

export type SortOption = 'episode' | 'latest';

type EpisodeContextType = {
  // Selection state
  episodes: ExtendedEpisodeType[];
  episodeInfinite: Omit<ReturnType<typeof useEpisodes>, 'episodes'>;
  orderEpisodes: ReturnType<typeof useOrderEpisodes>;
  sortOption: SortOption;
  isSelectionMode: boolean;
  selectedEpisodes: ExtendedEpisodeType[];
  longPressTimer: NodeJS.Timeout | null;

  // Selection actions
  setSortOption: (option: SortOption) => void;
  setIsSelectionMode: (value: boolean) => void;
  setSelectedEpisodes: (episodes: ExtendedEpisodeType[]) => void;
  selectAllEpisodes: (episodes: ExtendedEpisodeType[]) => void;
  clearSelection: () => void;
  exitSelectionMode: () => void;

  // Episode actions
  handleEpisodeClick: (episode: ExtendedEpisodeType) => void;
  handleLongPressStart: (episode: ExtendedEpisodeType) => void;
  handleLongPressEnd: () => void;
  handlePurchase: (viewImmediately?: boolean) => Promise<void>;

  // UI helpers
  isEpisodeSelected: (episodeId: string) => boolean;
};

const EpisodeContext = createContext<EpisodeContextType | null>(null);

type EpisodeProviderProps = {
  children: React.ReactNode;
};

export const EpisodeProvider: React.FC<EpisodeProviderProps> = ({
  children,
}) => {
  const t = useTranslations('introduction.episodes');
  const searchParams = useSearchParams();
  const workId = searchParams.get('workId');
  const { checkAvailableUser } = useAuth();

  // State
  const [sortOption, setSortOption] = useState<SortOption>('episode');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedEpisodes, setSelectedEpisodes] = useState<
    ExtendedEpisodeType[]
  >([]);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Modal refs
  const modalPurchaseRef = useRef<React.ElementRef<typeof ModalPurchase>>(null);
  const modalViewerRef =
    useRef<React.ElementRef<typeof ModalEpisodeViewer>>(null);

  const { episodes, ...episodeInfinite } = useEpisodes(
    workId!,
    [
      sortOption === 'latest'
        ? { field: 'created_at', ascending: false }
        : { field: 'position', ascending: true },
    ],
    9999
  );
  const orderEpisodes = useOrderEpisodes();

  // Selection actions
  const _toggleEpisodeSelection = useCallback(
    (episode: ExtendedEpisodeType) => {
      setSelectedEpisodes(episodes => {
        if (episodes.some(e => e.id === episode.id)) {
          return episodes.filter(e => e.id !== episode.id);
        }
        return [...episodes, episode];
      });
    },
    []
  );

  const selectAllEpisodes = useCallback((episodes: ExtendedEpisodeType[]) => {
    setSelectedEpisodes(episodes.filter(ep => !ep.is_ordered));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedEpisodes([]);
  }, []);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedEpisodes([]);
  }, []);

  const _showEpisodeViewer = useCallback((episode: ExtendedEpisodeType) => {
    modalViewerRef.current?.open(episode);
  }, []);

  // Episode actions
  const handleEpisodeClick = useCallback(
    (episode: ExtendedEpisodeType) => {
      checkAvailableUser({
        description: t('alert_sign_up.read_episode'),
      }).then(() => {
        if (isSelectionMode) {
          if (!episode.is_ordered) {
            _toggleEpisodeSelection(episode);
          }
          return;
        }

        if (episode.is_ordered) {
          _showEpisodeViewer(episode);
        } else {
          modalPurchaseRef.current?.open([episode]);
        }
      });
    },
    [
      checkAvailableUser,
      t,
      isSelectionMode,
      _toggleEpisodeSelection,
      _showEpisodeViewer,
    ]
  );

  const handleLongPressStart = useCallback((episode: ExtendedEpisodeType) => {
    if (episode.is_ordered) return;

    const timer = setTimeout(() => {
      setIsSelectionMode(true);
      setSelectedEpisodes([episode]);
    }, 500); // 500ms for long press

    setLongPressTimer(timer);
  }, []);

  const handleLongPressEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  // UI helpers
  const isEpisodeSelected = useCallback(
    (episodeId: string) =>
      selectedEpisodes.some(episode => episode.id === episodeId),
    [selectedEpisodes]
  );

  const handlePurchase = useCallback(
    async (viewImmediately: boolean = false) => {
      try {
        await orderEpisodes.trigger({
          episode_ids: selectedEpisodes.map(episode => episode.id),
        });
        await episodeInfinite.mutate();
        if (viewImmediately) {
          console.log('viewImmediately:', viewImmediately, selectedEpisodes[0]);
          _showEpisodeViewer(selectedEpisodes[0]);
        }
        exitSelectionMode();
      } catch (error) {
        console.error('Error ordering episodes:', error);
      }
    },
    [
      selectedEpisodes,
      orderEpisodes,
      exitSelectionMode,
      episodeInfinite,
      _showEpisodeViewer,
    ]
  );

  useEffect(() => {
    const storageEpisodesPendingPayment = sessionStorage.getItem(
      STORAGE.EPISODES_PENDING_PAYMENT
    );

    // console.log(
    //   'storageEpisodesPendingPayment:',
    //   storageEpisodesPendingPayment
    // );
    if (storageEpisodesPendingPayment) {
      const selectedEpisodes = JSON.parse(storageEpisodesPendingPayment);
      setSelectedEpisodes(selectedEpisodes);
      sessionStorage.removeItem(STORAGE.EPISODES_PENDING_PAYMENT);
      modalPurchaseRef.current?.open(selectedEpisodes);
    }
  }, []);

  const contextValue: EpisodeContextType = {
    // Selection state
    episodes,
    episodeInfinite,
    orderEpisodes,
    sortOption,
    isSelectionMode,
    selectedEpisodes,
    longPressTimer,

    // Selection actions
    setSortOption,
    setIsSelectionMode,
    setSelectedEpisodes,
    selectAllEpisodes,
    clearSelection,
    exitSelectionMode,

    // Episode actions
    handleEpisodeClick,
    handleLongPressStart,
    handleLongPressEnd,
    handlePurchase,

    // UI helpers
    isEpisodeSelected,
  };

  return (
    <EpisodeContext.Provider value={contextValue}>
      {children}

      {/* Modals */}
      <ModalPurchase ref={modalPurchaseRef} />
      <ModalEpisodeViewer ref={modalViewerRef} />
    </EpisodeContext.Provider>
  );
};

export const useEpisodeContext = () => {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error('useEpisodeContext must be used within an EpisodeProvider');
  }
  return context;
};
