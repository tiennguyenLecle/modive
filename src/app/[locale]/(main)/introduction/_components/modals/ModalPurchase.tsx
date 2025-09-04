'use client';

import React, { useImperativeHandle, useMemo, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import CheckboxComponent from '@/components/Checkbox';
import { useMeExtraData } from '@/hooks/useUser';
import { useAuth } from '@/lib/authentication/auth-context';

import { ExtendedEpisodeType } from '../../_actions/episode';
import { useEpisodeContext } from '../Episode';

type ModalPurchaseRef = {
  open: (episode: ExtendedEpisodeType[]) => void;
  close: () => void;
};

type ModalPurchaseProps = {};

// Animation variants for slide up/down effect
const modalVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      // type: 'spring' as const,
      damping: 25,
      stiffness: 200,
      duration: 0.3,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      // type: 'spring' as const,
      damping: 25,
      stiffness: 200,
      duration: 0.3,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const ModalPurchase = React.forwardRef<ModalPurchaseRef, ModalPurchaseProps>(
  ({}, ref) => {
    const t = useTranslations('introduction.modal_purchase');
    const [isOpen, setIsOpen] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const {
      isSelectionMode,
      selectedEpisodes,
      setSelectedEpisodes,
      handlePurchase,
      orderEpisodes,
      episodeInfinite,
    } = useEpisodeContext();
    const [viewImmediately, setViewImmediately] = useState(false);
    const { user } = useAuth();
    const me = useMeExtraData(isOpen, user?.id ?? '');

    const totalPrice = useMemo(() => {
      return selectedEpisodes.reduce((acc, episode) => acc + episode.price, 0);
    }, [selectedEpisodes]);

    const purchaseName = useMemo(() => {
      if (selectedEpisodes.length === 1) {
        return selectedEpisodes[0].name;
      }
      return `WORK_NAME (${selectedEpisodes.length} items)`;
    }, [selectedEpisodes]);

    const closeHandler = () => {
      setIsOpen(false);
      setViewImmediately(false);
      setDragOffset(0);
      if (!isSelectionMode) {
        // If not in selection mode, clear the selected episodes
        setSelectedEpisodes([]);
      }
    };

    // Handle drag events
    const handleDrag = (_: any, info: PanInfo) => {
      // Only allow dragging down (positive Y)
      const newOffset = Math.max(0, info.offset.y);
      setDragOffset(newOffset);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
      const finalOffset = Math.max(0, info.offset.y);

      // If dragged down more than 100px, close the modal
      if (finalOffset > 100) {
        closeHandler();
      } else {
        // Snap back to original position
        setDragOffset(0);
      }
    };

    useImperativeHandle(ref, () => ({
      open: episodes => {
        setIsOpen(true);
        setSelectedEpisodes(episodes);
        setDragOffset(0);
      },
      close: closeHandler,
    }));

    return (
      <>
        {isSelectionMode && selectedEpisodes.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-768 border-t border-gray-80 bg-white p-16">
            <button
              onClick={() => {
                setIsOpen(true);
                setDragOffset(0);
              }}
              className="w-full rounded-4 bg-primary px-16 py-12 text-16 font-semibold text-white"
            >
              {t('collect items', { count: selectedEpisodes.length })}
            </button>
          </div>
        )}

        <AnimatePresence>
          {isOpen && (
            <React.Fragment key="modal">
              {/* Backdrop/Overlay */}
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeHandler}
              />

              {/* Modal Content */}
              <motion.div
                className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-768 items-end justify-center"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  y: dragOffset,
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 200 }}
                dragElastic={0.1}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              >
                <div
                  className="w-full rounded-t-20 bg-white transition-opacity"
                  style={{
                    opacity: Math.max(0.3, 1 - dragOffset / 150),
                  }}
                >
                  {/* Modal Content */}
                  <div className="flex w-full flex-col">
                    {/* Grabber Indicator */}
                    <div className="border-t-20 flex cursor-grab items-center justify-center border-transparent py-12 active:cursor-grabbing">
                      <div
                        className="h-4 w-60 rounded-max bg-gray-80 transition-colors hover:bg-gray-60"
                        style={{
                          opacity: Math.max(0.5, 1 - dragOffset / 200),
                        }}
                      ></div>
                    </div>

                    <div className="flex flex-col p-16 text-gray-00">
                      {/* Order Details */}
                      <div className="mb-16 flex items-center justify-between gap-12">
                        <span className="text-20 font-bold">
                          {t('order_details')}
                        </span>
                        <span
                          className="flex-1 text-right text-16 font-normal"
                          title={purchaseName}
                        >
                          {purchaseName}
                        </span>
                      </div>

                      {/* Order Amount */}
                      <div className="mb-16 flex items-center justify-between gap-12">
                        <span className="text-20 font-bold">
                          {t('order_amount')}
                        </span>
                        <span className="flex-1 text-right text-16 font-normal">
                          {totalPrice?.toLocaleString()} {t('currency')}
                        </span>
                      </div>

                      {/* Holding Money */}
                      <div className="flex items-center justify-between gap-4 rounded-8 bg-gray-90 px-16 py-16">
                        <span className="text-16 font-normal text-gray-10">
                          {t('holding_money')}
                        </span>
                        <span className="text-16 font-normal text-gray-10">
                          {me?.data?.coins?.toLocaleString()} {t('currency')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-16">
                    <CheckboxComponent
                      onChange={e => setViewImmediately(e.target.checked)}
                      className="mb-16"
                    >
                      <span className="text-14 font-semibold text-gray-30">
                        {t('view_immediately')}
                      </span>
                    </CheckboxComponent>

                    {typeof me?.data?.coins === 'number' &&
                    me?.data?.coins >= totalPrice ? (
                      <Button
                        className="h-48 text-20 font-medium"
                        onClick={async () => {
                          await handlePurchase(viewImmediately).then(() => {
                            closeHandler();
                          });
                        }}
                        loading={
                          orderEpisodes.isMutating ||
                          episodeInfinite.isValidating
                        }
                      >
                        {t('payment')}
                      </Button>
                    ) : (
                      <>
                        <Button disabled>{t('insufficient_balance')}</Button>
                        {/* <Button
                          className="mb-12 h-48"
                          loading={
                            orderEpisodes.isMutating ||
                            episodeInfinite.isValidating
                          }
                        >
                          {t('auto_charging_at_a_cheaper')}
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-48"
                          loading={
                            orderEpisodes.isMutating ||
                            episodeInfinite.isValidating
                          }
                        >
                          {t('general_charging')}
                        </Button> */}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </>
    );
  }
);

ModalPurchase.displayName = 'ModalPurchase';

export default ModalPurchase;
