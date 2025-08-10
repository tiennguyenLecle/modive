'use client';

import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Close } from '@/assets/icons';
import { Button } from '@/components';
import { cx } from '@/utils/method';

export type ModalHandle = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
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

const Modal = forwardRef<ModalHandle, ModalProps>(
  (
    {
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
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useImperativeHandle(ref, () => ({ open, close }), []);

    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={close}
            >
              <div
                className={cx(
                  'w-full max-w-280 rounded-5 bg-white',
                  containerClassName
                )}
                style={{ boxShadow: '0px 4px 20px 0px #00000040' }}
                onClick={e => e.stopPropagation()}
              >
                {showHeader && (
                  <div className="relative flex h-46 items-center justify-between px-16">
                    {header ? (
                      <div className="w-full">{header}</div>
                    ) : (
                      <>
                        <div
                          className={cx(
                            'flex-1 text-14 font-semibold text-gray-00',
                            titleAlign === 'center'
                              ? 'text-center'
                              : 'text-left'
                          )}
                        >
                          {title}
                        </div>
                        {showCloseButton && (
                          <button
                            onClick={close}
                            className="absolute right-16 top-16 flex size-24 items-center justify-center transition"
                            aria-label="Close"
                          >
                            <Close className="size-11 text-gray-00" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
                {children}
                {showFooter &&
                  (footer ? (
                    <div className="p-16">{footer}</div>
                  ) : (
                    <div className="flex flex-col gap-8 p-16">
                      {cancelText && (
                        <button
                          className="flex h-40 w-full items-center justify-center gap-8 rounded-4 border border-gray-70 bg-gray-100 p-12 text-gray-00"
                          onClick={onCancel}
                        >
                          {cancelText}
                        </button>
                      )}
                      {confirmText && (
                        <button
                          className="flex h-40 w-full items-center justify-center gap-8 rounded-4 bg-primary p-12 text-gray-100"
                          onClick={onConfirm}
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
  }
);

Modal.displayName = 'Modal';

export default Modal;
