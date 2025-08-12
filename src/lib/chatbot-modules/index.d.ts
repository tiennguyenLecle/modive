import * as react from 'react';
import { ChangeEvent, ComponentProps, ReactNode } from 'react';
import {
  AvatarProps,
  ButtonProps,
  ImageMessageProps,
  TextareaProps,
  TextMessageProps,
  TimeLabelProps,
  VideoMessageProps,
} from '@chatbot-modules/ui-components';
import { ClassValue } from 'clsx';
import * as idb from 'idb';
import { VirtuosoProps } from 'react-virtuoso';
import * as react_jsx_runtime from 'react/jsx-runtime';

import { MessageInfoProps as MessageInfoProps$1 } from '@/types/message';

export { ChatboxComposerProps } from '@/types/composer';
export { ChatboxLayoutProps } from '@/types/layout';

export {
  MessageComponentProps,
  MessageInfoProps,
  MessageListProps,
} from '@/types/message';
export { TopInfoProps } from '@/types/topInfo';

type TopInfoProps = ComponentProps<'div'> & {
  avatar?: string;
  name?: string;
  role?: string;
  className?: string;
  children?: ReactNode;
  avatarSize?: 'small' | 'medium' | 'large';
};

type ChatboxLayoutProps = ComponentProps<'div'> & {
  layoutHeight?: string;
  className?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  headerComponent?: ReactNode;
  topInfoComponentOverride?: ReactNode;
  showTopInfo?: boolean;
  topInfoProps?: TopInfoProps;
  messageComponent?: ReactNode;
  composerComponent?: ReactNode;
};

declare const ChatboxLayout: react.MemoExoticComponent<
  (props: ChatboxLayoutProps) => react_jsx_runtime.JSX.Element
>;

declare const TopInfo: ({
  avatar,
  name,
  role,
  children,
  avatarSize,
  className,
  ...props
}: TopInfoProps) => react_jsx_runtime.JSX.Element;

type ChatboxComposerProps = ComponentProps<'div'> & {
  className?: string;
  sendButtonComponent?: ButtonProps;
  beforeComposerOutsideComponent?: ButtonProps;
  afterComposerOutsideComponent?: ButtonProps;
  beforeComposerInsideComponent?: ButtonProps;
  afterComposerInsideComponent?: ButtonProps;
  textareaProps?: TextareaProps;
  onSend?: (message: string) => void;
  onKeyDown?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabledComposer?: boolean;
};

declare const ChatboxComposer: ({
  className,
  sendButtonComponent,
  beforeComposerOutsideComponent,
  afterComposerOutsideComponent,
  beforeComposerInsideComponent,
  afterComposerInsideComponent,
  textareaProps,
  ...props
}: ChatboxComposerProps) => react_jsx_runtime.JSX.Element;

type MessageType = 'text' | 'image' | 'audio' | 'video' | 'file';
type MessageSpeakerType = 'user' | 'chatbot' | 'system';
type MessageCacheType = 'local' | 'indexed' | false;

type MessageArrayItem = {
  type: MessageType;
  message: ReactNode | string;
  imageUrl?: string;
};

type MessageInfoProps = {
  id: string;
  chatroomId: string;
  speakerType: MessageSpeakerType;
  speakerId?: string;
  name?: string;
  message?: string;
  createdAt?: string;
  avatarUrl?: string;
  contentOverride?: ReactNode;
  videoMessageContent?: ReactNode;
  messageArray?: MessageArrayItem[];
  align?: 'left' | 'right' | 'center';
};

type MessageListProps = {
  messages?: MessageInfoProps[];
  conversationId?: string;
  className?: string;
  onLoadMorePreviousData?: () => void;
  cache?: MessageCacheType;
  showScrollToEndButton?: boolean;
  virtuosoProps?: VirtuosoProps;
  scrollToEndButtonProps?: ButtonProps;
  emptyDataComponent?: ReactNode;
  isPrevLoading?: boolean;
  prevLoadingComponent?: ReactNode;
  customMessageComponentProps?: Omit<MessageComponentProps, 'item'>;
};

type MessageComponentProps = {
  item: MessageInfoProps;
  className?: string;
  textMessageOverride?: ReactNode;
  imageMessageOverride?: ReactNode;
  videoMessageOverride?: ReactNode;
  textMessageProps?: TextMessageProps;
  imageMessageProps?: ImageMessageProps;
  videoMessageProps?: VideoMessageProps;
  timeLabelProps?: TimeLabelProps;
  avatarProps?: AvatarProps;
};

declare const MessageList: react.MemoExoticComponent<
  react.ForwardRefExoticComponent<MessageListProps & react.RefAttributes<any>>
>;

/**
 * Utility function to merge class names
 * Combines multiple class names and filters out falsy values
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Utility function to save messages to indexedDBs
 */
declare const getDB: () => Promise<idb.IDBPDatabase<unknown>>;
declare const readIndexedDB: (
  conversationId: string
) => Promise<MessageInfoProps[] | null>;
declare const writeIndexedDB: (
  conversationId: string,
  messages: MessageInfoProps[]
) => Promise<void>;
declare const scrollToEnd: (
  virtuosoRef: any,
  messages: MessageInfoProps[]
) => void;

declare const DEFAULT_AVATAR_IMAGE_URL =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
declare const sampleMessages: MessageInfoProps$1[];
declare const MESSAGE_TYPE: {
  TEXT: string;
  IMAGE: string;
  AUDIO: string;
  VIDEO: string;
  FILE: string;
};
declare const MESSAGE_SPEAKER_TYPE: {
  USER: string;
  CHATBOT: string;
  SYSTEM: string;
};
declare const MESSAGE_CACHE_TYPE: {
  LOCAL: string;
  INDEXED: string;
  FALSE: string;
};

export {
  ChatboxComposer,
  ChatboxLayout,
  DEFAULT_AVATAR_IMAGE_URL,
  MESSAGE_CACHE_TYPE,
  MESSAGE_SPEAKER_TYPE,
  MESSAGE_TYPE,
  MessageList,
  TopInfo,
  cn,
  getDB,
  readIndexedDB,
  sampleMessages,
  scrollToEnd,
  writeIndexedDB,
};
