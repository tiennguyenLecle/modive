// 'use client';

// import {
//   ChangeEvent,
//   ComponentProps,
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { useParams, useSearchParams } from 'next/navigation';

// import { NextApi } from '@/lib/api';
// import { Message } from '@/lib/api/types/chat.types';
// // @ts-ignore
// //disable eslin
// import {
//   ChatboxComposer,
//   ChatboxLayout,
//   MessageInfoProps,
//   MessageList,
// } from '@/lib/chatbot-modules';

// import '@/lib/chatbot-modules/dist/styles.css';

// import dayjs from 'dayjs';
// import { includes } from 'zod';

// import { filterMessageConditions } from '@/utils/method';

// type ChatbotProps = ComponentProps<'div'> & {
//   messages: Message[];
// };

// const DEFAULT_IMAGE_URL = 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png';

// export default function Chatbot({ messages: initialMessages }: ChatbotProps) {
//   const { sendMessage } = useSendMessage();
//   const [messages, setMessages] = useState<Message[]>(initialMessages || []);
//   const [newMessage, setNewMessage] = useState('');
//   const { chatroomId } = useParams();
//   const messageListRef = useRef<any>(null);
//   const [isPreviousLoading, setIsPreviousLoading] = useState(false);
//   const messagesRef = useRef<Message[]>(initialMessages || []);
//   const prevLoadMoreRef = useRef<boolean>(false);

//   const handleLoadMore = useCallback(async () => {
//     if (prevLoadMoreRef.current) return;
//     prevLoadMoreRef.current = true;
//     setIsPreviousLoading(true);

//     const prevMessages = messagesRef?.current?.length;
//     const beforeIdx = messagesRef?.current?.[0]?.id;

//     const res: any = await NextApi.get(
//       `/api/chat/${chatroomId}?direction=before&cursor=${beforeIdx}&limit=20`
//     );

//     if (res?.data?.length > 0) {
//       const newData = [...res.data, ...messagesRef?.current];
//       messagesRef.current = newData;
//       setMessages(newData);

//       prevLoadMoreRef.current = false;
//       setTimeout(() => {
//         (messageListRef as any).current.scrollToIndex({
//           index: newData.length - prevMessages,
//           align: 'end',
//           behavior: 'instant',
//         });
//         setIsPreviousLoading(false);
//       }, 100);
//     } else {
//       prevLoadMoreRef.current = true;
//       setIsPreviousLoading(false);
//     }
//   }, [messages, isPreviousLoading]);

//   const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
//     setNewMessage(e.target.value);
//   }, []);

//   const handleMessageText = (message: string) => {
//     if (typeof message === 'string' && /\n+/.test(message)) {
//       const parts = message?.split(/\n+/)?.filter(Boolean) || [];
//       if (parts.length === 0) return [];

//       return parts.map(part => {
//         const isImage = part.startsWith('::image{id=');

//         if (isImage) {
//           const imageId = part?.split('{id=')[1]?.split('}')[0];
//           console.log('aaa part imageId', imageId);
//           return {
//             type: 'image',
//             imageUrl: DEFAULT_IMAGE_URL,
//             message: '',
//           };
//         }
//         return {
//           type: 'text',
//           message: part,
//         };
//       });
//     }
//   };

//   const mappedMessages = (messages: Message[]): MessageInfoProps[] => {
//     const seenIds = new Set<string>();

//     const baseMapped = messages
//       .filter(msg => !filterMessageConditions(msg.message, msg.id, seenIds))
//       .map(msg => ({
//         id: msg.id,
//         chatroomId: msg.chatroom_id,
//         speakerType: msg.speaker_type ?? 'user',
//         speakerId: msg.speaker_id,
//         name: msg.speaker_id,
//         message: msg.message,
//         createdAt: msg.created_at ? dayjs(msg.created_at).format('HH:mm') : '',
//         avatarUrl: DEFAULT_IMAGE_URL,
//         messageArray: handleMessageText(msg.message),
//       }));

//     return baseMapped;
//   };

//   console.log(mappedMessages(messages));

//   const messageComponent = useMemo(
//     () => (
//       <MessageList
//         messages={mappedMessages(messages)}
//         conversationId={chatroomId as string}
//         cache="local"
//         onLoadMorePreviousData={handleLoadMore}
//         showScrollToEndButton={true}
//         className={'px-16'}
//         ref={messageListRef}
//         isPrevLoading={isPreviousLoading}
//         isPrevLoadingComponent={
//           <div className="flex h-40 w-full items-center justify-center text-16">
//             Loading...
//           </div>
//         }
//       />
//     ),
//     [messages, handleLoadMore, isPreviousLoading, messageListRef, chatroomId]
//   );

//   const composerComponent = useMemo(
//     () => (
//       <ChatboxComposer
//         textareaProps={{
//           value: newMessage,
//           onChange: handleChange,
//           autoSize: {
//             minRows: 1,
//             maxRows: 5,
//           },
//         }}
//         sendButtonComponent={{
//           onClick: () => sendMessage(newMessage),
//           disabled: !newMessage.trim(),
//           children: 'Send',
//         }}
//       />
//     ),
//     [newMessage, handleChange, sendMessage]
//   );

//   return (
//     <ChatboxLayout
//       backgroundColor="#ed00ff40"
//       layoutHeight="80dvh"
//       messageComponent={messageComponent}
//       composerComponent={composerComponent}
//     />
//   );
// }

// const useSendMessage = () => {
//   const { chatroomId } = useParams();
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('sessionId');

//   const sendMessage = async (text: string) => {
//     await NextApi.post(`/api/chat/${chatroomId}`, {
//       body: {
//         sessionId,
//         text: text,
//       },
//     });
//   };

//   return { sendMessage };
// };
