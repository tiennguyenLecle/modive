# Chat Components Refactoring

This directory contains the refactored chat components with improved code organization, maintainability, and readability.

## Files Structure

### Core Components

- `Chatbot.client.tsx` - Main chatbot component for displaying messages and handling chat interactions
- `Composer.client.tsx` - Message input component for composing and sending messages

### Hooks

- `hooks/useChatbot.ts` - Custom hooks for chatbot functionality (message management, loading, sending)
- `hooks/useComposer.ts` - Custom hooks for composer functionality (message composition, polling)

### Utilities

- `messageTransformers.ts` - Functions for transforming messages between different formats
- `utils.ts` - General utility functions for message handling and alignment

## Usage

```tsx
// Chatbot component
<Chatbot
  messages={initialMessages}
  chatbotName="Assistant"
  currentUserId={userId}
/>

// Composer component
<Composer
  chatroomId={chatroomId}
  chatbotName="Assistant"
  sendMessage={handleSendMessage}
  isChapterMode={false}
/>
```
