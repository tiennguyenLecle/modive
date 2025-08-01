# API Client Architecture

This directory contains the foundational logic for making API requests throughout the application. It's designed to be robust, maintainable, and easy to use, providing a clear distinction between different types of API calls.

## Core Concepts

Our API communication is built on a **Factory Pattern**. Instead of a single, monolithic API instance, we have a function that creates configured API clients. This allows us to generate multiple clients for different purposes with varying configurations (e.g., different base URLs, headers, or authentication methods).

### Files

- **`factory.ts`**: This is the heart of the module. It exports a single function, `createApiClient(baseUrl)`, which is a factory for generating new API clients. It handles all the low-level logic of `fetch`, including setting headers, processing `FormData` vs. `JSON` bodies, and standardized error handling.

- **`instances.ts`**: This file uses the factory to create and export the specific, pre-configured API client instances that the application will use. This is the central point for defining the different API "targets" our app needs to communicate with.

- **`index.ts`**: This is a barrel file that re-exports the essential parts of the module (`createApiClient`, `externalApi`, `internalApi`). This provides a clean, single entry point for other parts of the application to import from (`import { ... } from '@/lib/api'`).

## Available Instances

We export two primary instances from `instances.ts`:

### 1. `externalApi`

- **Purpose**: To communicate directly with our main, external backend API.
- **`baseURL`**: `process.env.API_BASE_URL`
- **Usage Context**: This client **must** be used in **server-side environments only** (i.e., Server Components, API Routes, and other server-side functions like `generateStaticParams`). This is because it may require server-only environment variables (like API keys) and makes direct calls to the external API endpoint.

### 2. `internalApi`

- **Purpose**: To communicate with our own application's API routes (the "Backend for Frontend" or proxy layer).
- **`baseURL`**: `''` (empty string)
- **Usage Context**: This client should be used primarily in **Client Components**. It makes relative requests to our own server (e.g., `/api/users`), which then acts as a proxy to call the external API. This pattern is crucial for security, as it prevents exposing sensitive API keys or complex logic to the browser.

## Usage Example

### In a Server Component

```tsx
// app/products/[id]/page.tsx
import { externalApi } from '@/lib/api';

async function ProductPage({ params }) {
  // Direct call to the real API on the server
  const product = await externalApi.get(`/products/${params.id}`);
  return <div>{product.name}</div>;
}
```

### In a Client Component

```tsx
// components/search-bar.tsx
'use client';

import { useState } from 'react';

import { internalApi } from '@/lib/api';

function SearchBar() {
  const [results, setResults] = useState([]);

  const handleSearch = async query => {
    // Call to our Next.js API route proxy
    const data = await internalApi.get(`/api/search?q=${query}`);
    setResults(data);
  };

  // ...
}
```

### In an API Route (Proxy)

```ts
// app/api/search/route.ts
import { NextResponse } from 'next/server';

import { externalApi } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // The proxy route uses the externalApi client to call the real API
  const results = await externalApi.get(`/search?q=${query}`);
  return NextResponse.json(results);
}
```
