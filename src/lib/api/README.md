# API Client Architecture

This directory contains the foundational logic for making API requests throughout the application. It's designed to be robust, maintainable, and easy to use, providing a clear distinction between different types of API calls.

## 📁 Directory Structure

```
src/lib/api/
├── classes/                    # API class definitions (pure logic)
│   ├── base-api.class.ts      # Base API client class
│   └── chat-api.class.ts      # Chat API client class
├── instances/                  # Configured singleton instances
│   ├── client-safe.ts         # Safe for client & server use
│   └── server-only.ts         # Server-only instances
├── middleware/                 # Request/response middleware
│   └── validators.ts          # HOF validation functions
├── index.ts                   # Client-safe exports
├── server-only.ts             # Server-only exports
└── README.md                  # This documentation
```

## Core Concepts

Our API communication follows a **classes + instances** pattern with clear separation between:

- **Classes**: Pure logic without configuration or environment dependencies
- **Instances**: Configured singletons with specific settings and environment variables
- **Client-safe vs Server-only**: Clear boundaries preventing accidental exposure

### 🎯 **Key Benefits:**

- **🔧 Flexibility**: Create multiple instances of same class with different configs
- **🧪 Testability**: Test classes independently without environment setup
- **🔒 Security**: Clear separation of sensitive vs public code
- **📝 Maintainability**: Organized structure with single responsibility

## Available APIs

### 🌐 Client-Safe APIs (from `@/lib/api`)

#### 1. `internal`

- **Purpose**: Communicate with our Next.js API routes (BFF pattern)
- **Base URL**: `''` (relative requests)
- **Usage**: Safe in both Client and Server Components
- **Best for**: Client Components making API calls

```typescript
import { internal } from '@/lib/api';

const data = await NextApi.get('/api/users');
```

#### 2. `BaseApiClient`

- **Purpose**: Base class for creating custom API clients
- **Usage**: Extend this class for new API integrations

### 🔒 Server-Only APIs (from `@/lib/api/server-only`)

#### 1. `chatApi`

- **Purpose**: Direct communication with external Chat API
- **Base URL**: `process.env.DIT_API_BASE_URL`
- **Usage**: Server Components and API Routes only
- **Security**: Contains API keys and sensitive logic

```typescript
import { chatApi } from '@/lib/api/server-only';

const sessions = await ChatApi.searchSessionsByUserId('123');
```

## 📖 Usage Examples

### 🖥️ In Server Components (Recommended)

```tsx
// app/chat/page.tsx
import { chatApi } from '@/lib/api/server-only';

export default async function ChatPage() {
  // ✅ Direct API call - optimal performance
  const sessions = await ChatApi.searchSessionsByUserId('user-123');

  return (
    <div>
      {sessions.map(session => (
        <div key={session.id}>{session.title}</div>
      ))}
    </div>
  );
}
```

### 🌐 In Client Components

```tsx
// components/chat-list.tsx
'use client';

import { useEffect, useState } from 'react';

import { internal } from '@/lib/api';

export function ChatList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      // ✅ Call via Next.js API route (secure)
      const data = await NextApi.get('/api/session?userId=123');
      setSessions(data);
    };

    fetchSessions();
  }, []);

  return (
    <div>
      {sessions.map(session => (
        <div key={session.id}>{session.title}</div>
      ))}
    </div>
  );
}
```

### 🛣️ In API Routes (Proxy Pattern)

```ts
// app/api/session/route.ts
import { NextResponse } from 'next/server';

import { chatApi } from '@/lib/api/server-only';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    // ✅ Direct external API call from server
    const sessions = await ChatApi.searchSessionsByUserId(userId);
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
```

## 🚀 Performance Guidelines

| Context              | Recommended        | Performance | Security  |
| -------------------- | ------------------ | ----------- | --------- |
| **Client Component** | `NextApi.get()`    | ✅ Good     | ✅ Secure |
| **Server Component** | `ChatApi.method()` | 🚀 Best     | ✅ Secure |
| **API Route**        | `ChatApi.method()` | 🚀 Best     | ✅ Secure |

## 🔄 Migration from Old Structure

```typescript
// ❌ Old imports
import { internalApi } from '@/lib/api';
import { chatApi } from '@/lib/api/server';

// ✅ New imports
import { internal } from '@/lib/api';
import { chatApi } from '@/lib/api/server-only';
```

## 🔧 Extending the System

### Creating New API Clients

**1. Create a new class:**

```typescript
// classes/payment-api.class.ts
import { BaseApiClient } from './base-api.class';

export class PaymentApiClient extends BaseApiClient {
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    super(baseUrl, {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    });
    this.apiKey = apiKey;
  }

  public processPayment(amount: number, token: string) {
    return this.post('/payments', { amount, token });
  }
}
```

**2. Create instances:**

```typescript
// instances/server-only.ts
import { PaymentApiClient } from '../classes/payment-api.class';

export const paymentApi = new PaymentApiClient(
  process.env.PAYMENT_API_URL!,
  process.env.PAYMENT_API_KEY!
);
```

**3. Export appropriately:**

```typescript
// server-only.ts
export * from './instances/server-only'; // Will include paymentApi
```

### Creating Multiple Instances

```typescript
// instances/server-only.ts
export const chatApiProd = new ChatApiClient(); // Uses prod env vars
export const chatApiDev = new ChatApiClient(); // Could use different config
```
