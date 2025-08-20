'use client';

import { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Close } from '@/assets/icons';
import { cx } from '@/utils/method';

import Spinner from './Spinner';

type ModalProps = {
  open?: boolean;
  loading?: boolean;
  title?: ReactNode;
  titleAlign?: 'left' | 'center';
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showCloseButton?: boolean;
  containerClassName?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const Modal = ({
  open = false,
  loading = false,
  title,
  titleAlign = 'center',
  header,
  children,
  footer,
  cancelText,
  confirmText,
  showHeader = true,
  showFooter = true,
  showCloseButton = true,
  containerClassName = '',
  onCancel,
  onConfirm,
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel?.();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-0 z-50 mx-auto flex max-w-768 items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => {
              onCancel?.();
            }}
          >
            <div
              className={cx(
                'flex max-h-3/4 w-3/4 flex-col rounded-5 bg-white',
                containerClassName
              )}
              style={{ boxShadow: '0px 4px 20px 0px #00000040' }}
              onClick={e => e.stopPropagation()}
            >
              {showHeader && (
                <div className="flex items-center justify-between p-16">
                  {header ? (
                    <div className="w-full">{header}</div>
                  ) : (
                    <div
                      className={cx(
                        'flex-1 text-14 font-semibold text-gray-00',
                        titleAlign === 'center' ? 'text-center' : 'text-left'
                      )}
                    >
                      {title}
                    </div>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={() => {
                        onCancel?.();
                      }}
                      className="flex size-24 items-center justify-center rounded-2 transition duration-300 hover:bg-gray-80"
                      aria-label="Close"
                    >
                      <Close className="size-11 text-gray-00" />
                    </button>
                  )}
                </div>
              )}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="container flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  children
                )}
              </div>
              {showFooter &&
                (footer ? (
                  <div className="p-16">{footer}</div>
                ) : (
                  <div className="flex flex-col gap-8 p-16">
                    {cancelText && (
                      <button
                        className="flex h-40 w-full items-center justify-center gap-8 rounded-4 border border-gray-70 bg-gray-100 p-12 text-gray-00"
                        onClick={() => {
                          onCancel?.();
                        }}
                      >
                        {cancelText}
                      </button>
                    )}
                    {confirmText && (
                      <button
                        className="flex h-40 w-full items-center justify-center gap-8 rounded-4 bg-primary p-12 text-gray-100"
                        onClick={() => {
                          onConfirm?.();
                        }}
                      >
                        {confirmText}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
