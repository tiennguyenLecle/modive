# 🚀 API V3 Documentation and Parameter Explanation

---

## 📋 Table of Contents

- [1. 🌟 Overview](#1-overview)
- [2. 🔐 Authentication](#2-authentication)
- [3. 📡 API Endpoints](#3-api-endpoints)
  - [3.1. 🔵 Create New Session](#31-create-new-session)
  - [3.2. 🟢 Search Existing Sessions](#32-search-existing-sessions)
  - [3.3. 🔵 Send Messages](#33-send-messages)
  - [3.4. 🟢 Get Messages](#34-get-messages)
- [4. ❌ Error Codes Reference](#4-error-codes-reference)
- [5. 🛠️ Troubleshooting](#5-troubleshooting)
- [6. 📞 Support](#6-support)

---

## 1. 🌟 Overview

1. When a new user enters the app and clicks **Start Chatting**, the app will:
   - Call **Search Existing Sessions** API to check if there is already an active session for that user.
   - If an existing session is found, navigate the user directly to the related chatroom.
   - If no existing session is found, call **Create New Session** API to create a new session, then navigate to the new chatroom.

2. Once inside the chatroom:
   - When entering the chatroom for the first time, use the **Get Messages** API to fetch all messages (or the latest batch).
   - If the app already has the newest message ID, fetch only messages **after** that ID to get new incoming messages.
   - To load older messages (history), fetch messages **before** a specific message ID.

3. When the user sends a message:
   - Use the **Send Messages** API to send the message to the current session.

---

## 2. 🔐 Authentication

All API endpoints require authentication using an API key passed in the `x-api-key` header.

```bash
-H "x-api-key: YOUR_API_KEY"
```

---

## 3. 📡 API Endpoints

| Method                                                                                                                | Endpoint                           | Purpose                    | Auth Required | Status    |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------- | ------------- | --------- |
| <span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">POST</span> | `/v3/universe/{bundleId}`          | Create new chat session    | ✅ API Key    | 🟢 Active |
| <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">GET</span>  | `/sessions/search`                 | Search existing sessions   | ✅ API Key    | 🟢 Active |
| <span style="background: #007bff; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">POST</span> | `/v3/universe/session/{sessionId}` | Send message to session    | ✅ API Key    | 🟢 Active |
| <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;">GET</span>  | `/chats/chatroom/{chatroomId}`     | Get messages from chatroom | ✅ API Key    | 🟢 Active |

---

## 3.1. 🔵 Create New Session

**POST** `{{API_URL}}/v3/universe/{{bundleId}}`

### URL Parameters

| Parameter  | Type   | Required | Description                                                                                                     | Example              |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------- | -------------------- |
| `bundleId` | string | ✅ Yes   | A short name or alias representing the universe (like a nickname). Different from `universeId` which is a UUID. | `"my-chat-universe"` |

### Request Body

| Parameter         | Type   | Required | Description                                          | Example                      |
| ----------------- | ------ | -------- | ---------------------------------------------------- | ---------------------------- |
| `endUserId`       | string | ✅ Yes   | Unique identifier of the end user                    | `"uuid-9876-5432-1abc-def0"` |
| `endUserMetadata` | string | ❌ No    | Additional user info (e.g., VIP status, preferences) | `"SUBSCRIBED"`               |

### Headers

| Header      | Type   | Required | Description                |
| ----------- | ------ | -------- | -------------------------- |
| `x-api-key` | string | ✅ Yes   | API key for authentication |

### Request Example

```bash
curl -X POST "{{API_URL}}/v3/universe/my-chat-universe" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "endUserId": "uuid-9876-5432-1abc-def0",
    "endUserMetadata": "SUBSCRIBED"
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-1234-5678-9abc-def0", // This is the session ID
    "userId": "uuid-9876-5432-1abc-def0",
    "snapshot": {} // unused
  },
  "status": 201
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "UNIVERSE_NOT_FOUND",
    "message": "universe not found",
    "stack": "Error: universe not found\n    at GameService.createNewSession (/app/packages/common/dist/module/game/foundation/impl/execution/game.base-service.js:166:19)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async GameController.createV3UniverseSession (/app/apps/server/dist/apps/server/src/game/game.controller.js:33:31)\n    at async /app/node_modules/.pnpm/@sentry+nestjs@9.26.0_@nestjs+common@10.4.15_class-transformer@0.5.1_class-validator@0.14.1_r_xwjvfxvvn3w2iie7n6dbcyr4ie/node_modules/@sentry/nestjs/build/cjs/integrations/sentry-nest-core-instrumentation.js:252:16"
  },
  "status": 404
}
```

---

## 3.2. 🟢 Search Existing Sessions

**GET** `{{API_URL}}/sessions/search`

### Query Parameters

| Parameter    | Type   | Required | Description                                                                                                                                                                                        | Example                      |
| ------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `universeId` | string | ✅ Yes   | The UUID of the universe to filter sessions by. This is a full unique identifier (UUID), different from `bundleId`.                                                                                | `"uuid-1234-5678-9abc-def0"` |
| `endUserId`  | string | ❌ No    | User ID to find related sessions. When provided, filters sessions to only those belonging to this specific user within the specified universe. When omitted, returns all sessions in the universe. | `"uuid-9876-5432-1abc-def0"` |
| `limit`      | number | ❌ No    | Number of results to return                                                                                                                                                                        | `20`                         |
| `page`       | number | ❌ No    | Page number for pagination                                                                                                                                                                         | `1`                          |

### Headers

| Header      | Type   | Required | Description                |
| ----------- | ------ | -------- | -------------------------- |
| `x-api-key` | string | ✅ Yes   | API key for authentication |

### Request Example

```bash
curl -X GET "{{API_URL}}/sessions/search?universeId=uuid-1234-5678-9abc-def0&endUserId=uuid-9876-5432-1abc-def0&limit=20&page=1" \
  -H "x-api-key: YOUR_API_KEY"
```

### Response Example

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "session_uuid_xyz789abc123", // This is the newest session ID
        "user_id": null,
        "universe_id": "universe_uuid_xyz789abc123",
        "created_at": "2025-08-10T07:06:59.981832+00:00",
        "updated_at": "2025-08-10T07:06:59.981832+00:00",
        "v2_data": {
          "game_state": {
            "chatroomStates": {
              // e.g., kangYiHyunV4GeminiFlash-c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001
              "{chatbotName}-{endUserId}": {
                "db": {
                  "chatroomId": "room_uuid_xyz789abc123" // This is the chatroom ID
                }
              }
            }
          }
        }
      },
      {
        "id": "session_uuid_xyz789abc456", // This is the session ID
        "user_id": null,
        "universe_id": "universe_uuid_xyz789abc123",
        "created_at": "2025-08-10T07:06:59.981832+00:00",
        "updated_at": "2025-08-10T07:06:59.981832+00:00",
        "v2_data": {
          "game_state": {
            "chatroomStates": {
              // e.g., kangYiHyunV4GeminiFlash-c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001
              "{chatbotName}-{endUserId}": {
                "db": {
                  "chatroomId": "room_uuid_xyz789abc123" // This is the chatroom ID
                }
              }
            }
          }
        }
      }
    ]
  },
  "status": 200
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": ["Invalid uuid"]
  },
  "status": 400
}
```

---

## 3.3. 🔵 Send Messages

**POST** `{{API_URL}}/v3/universe/session/{{sessionId}}`

### URL Parameters

| Parameter   | Type   | Required | Description                           | Example                    |
| ----------- | ------ | -------- | ------------------------------------- | -------------------------- |
| `sessionId` | string | ✅ Yes   | The session ID to send the message to | `"sess_uuid_abc123def456"` |

### Request Body

| Parameter | Type   | Required | Description                                                           | Example                                  |
| --------- | ------ | -------- | --------------------------------------------------------------------- | ---------------------------------------- |
| `userId`  | string | ✅ Yes   | ID of Owner X API KEY (the owner/organization that holds the API key) | `"40ab25fe-737f-477c-b320-ab2debe1691a"` |
| `command` | object | ✅ Yes   | Command object containing message details and metadata                | See command structure below              |

#### Command Object Structure

| Parameter    | Type   | Required | Description                                          | Example                                                          |
| ------------ | ------ | -------- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| `type`       | string | ✅ Yes   | Command type, always "SEND_MESSAGE_TO_CHATROOM"      | `"SEND_MESSAGE_TO_CHATROOM"`                                     |
| `messages`   | array  | ✅ Yes   | Array of message strings to send                     | `["I love you ok?"]`                                             |
| `metadata`   | object | ❌ No    | Additional message metadata                          | `{}`                                                             |
| `senderId`   | string | ✅ Yes   | ID of End User (the actual user sending the message) | `"c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001"`                         |
| `chatroomId` | string | ✅ Yes   | ID of the chatroom to send message to                | `"kangYiHyunV4GeminiFlash-c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001"` |
| `senderType` | string | ✅ Yes   | Type of sender (user, chatbot, etc.)                 | `"user"`                                                         |
| `appContext` | object | ❌ No    | Application context with user information            | See appContext structure below                                   |

#### AppContext Object Structure

| Parameter  | Type   | Required | Description          | Example        |
| ---------- | ------ | -------- | -------------------- | -------------- |
| `username` | string | ❌ No    | User's display name  | `"Luyen Tran"` |
| `dob`      | string | ❌ No    | User's date of birth | `"2002-02-07"` |
| `gender`   | string | ❌ No    | User's gender        | `"male"`       |

### Headers

| Header      | Type   | Required | Description                |
| ----------- | ------ | -------- | -------------------------- |
| `x-api-key` | string | ✅ Yes   | API key for authentication |

### Request Example

```bash
curl -X POST "{{API_URL}}/v3/universe/session/sess_uuid_abc123def456" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "userId": "40ab25fe-737f-477c-b320-ab2debe1691a",
    "command": {
        "type": "SEND_MESSAGE_TO_CHATROOM",
        "messages": [
            "I love you ok?"
        ],
        "metadata": {},
        "senderId": "c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001",
        "chatroomId": "kangYiHyunV4GeminiFlash-c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001",
        "senderType": "user",
        "appContext": {
            "username": "Luyen Tran",
            "dob": "2002-02-07",
            "gender": "male"
        }
    }
  }'
```

### Response Example

```json
{
  "success": true,
  "data": {
    "result": {
      "message": "메시지를 전송했습니다.", // Message sent successfully
      "stateActions": {} // contain message id and other info
    },
    "state": {}
  },
  "status": 200
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "Invalid data",
    "message": "invalid input syntax for type uuid: \"7860593c-29ce-438f-9d72-f72692fa9184\"",
    "stack": "Error: invalid input syntax for type uuid: \"7860593c-29ce-438f-9d72-f72692fa9184\"\n    at handlePostgrestSBError (/app/packages/common/dist/module/common/common.error.js:82:19)\n    at handleCommonSBError (/app/packages/common/dist/module/common/common.error.js:31:9)\n    at SessionsService.findOneWithUniverse (/app/packages/common/dist/module/session/session.base-service.js:387:48)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async GameService.loadGameSnapshot (/app/packages/common/dist/module/game/foundation/impl/execution/game.base-service.js:74:25)\n    at async GameService.loadLocalDispatcher (/app/packages/common/dist/module/game/foundation/impl/execution/game.base-service.js:47:39)\n    at async GameService.executeCommand (/app/packages/common/dist/module/game/foundation/impl/execution/game.base-service.js:196:28)\n    at async GameController.executeGameCommand (/app/apps/server/dist/apps/server/src/game/game.controller.js:67:35)\n    at async /app/node_modules/.pnpm/@sentry+nestjs@9.26.0_@nestjs+common@10.4.15_class-transformer@0.5.1_class-validator@0.14.1_r_xwjvfxvvn3w2iie7n6dbcyr4ie/node_modules/@sentry/nestjs/build/cjs/integrations/sentry-nest-core-instrumentation.js:252:16"
  },
  "status": 400
}
```

---

## 3.4. 🟢 Get Messages

**GET** `{{API_URL}}/chats/chatroom/{{chatroomId}}`

### URL Parameters

| Parameter    | Type   | Required | Description                            | Example                    |
| ------------ | ------ | -------- | -------------------------------------- | -------------------------- |
| `chatroomId` | string | ✅ Yes   | The chatroom ID to fetch messages from | `"room_uuid_xyz789abc123"` |

### Query Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                  | Example                   |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `cursor`    | string | ❌ No    | Message ID to use as a starting point for pagination. **Must be used together with `direction`** - if only one is provided, both parameters will be ignored. | `"msg_uuid_xyz789abc123"` |
| `direction` | string | ❌ No    | Direction relative to cursor: `"before"` or `"after"`. **Must be used together with `cursor`** - if only one is provided, both parameters will be ignored.   | `"before"`                |
| `limit`     | number | ❌ No    | Number of messages to retrieve (default: 10)                                                                                                                 | `20`                      |

### Headers

| Header      | Type   | Required | Description                |
| ----------- | ------ | -------- | -------------------------- |
| `x-api-key` | string | ✅ Yes   | API key for authentication |

### Request Example

```bash
curl -X GET "{{API_URL}}/chats/chatroom/room_uuid_xyz789abc123?cursor=msg_uuid_xyz789abc123&direction=before&limit=20" \
  -H "x-api-key: YOUR_API_KEY"
```

### Response Example

```json
{
  "success": true,
  "data": [
    {
      "id": "msg_uuid_xyz789abc123", // This is the message ID
      "chatroom_id": "room_uuid_xyz789abc123",
      "speaker_type": "user", // This is the user's message
      "speaker_id": "uuid-9876-5432-1abc-def0",
      "message": "Hello", // This is the message content
      "message_embedding": null,
      "metadata": {},
      "created_at": "2025-08-10T07:06:59.981832+00:00",
      "updated_at": "2025-08-10T07:06:59.981832+00:00",
      "v2_data": {}
    },
    {
      "id": "msg_uuid_xyz789abc456", // This is the message ID
      "chatroom_id": "room_uuid_xyz789abc123",
      "speaker_type": "chatbot", // This is the chatbot's response
      "speaker_id": "uuid-1234-5678-9abc-def0",
      "message": "Hello, how can I help you today?", // This is the message content
      "message_embedding": null,
      "metadata": {},
      "created_at": "2025-08-10T07:06:59.981832+00:00",
      "updated_at": "2025-08-10T07:06:59.981832+00:00",
      "v2_data": {}
    }
  ],
  "status": 200
}
```

### Error Responses

```json
{
  "success": false,
  "error": {
    "code": "22P02",
    "message": "invalid input syntax for type uuid: \"6d04eb51-6357-4b6f-9373-a151f4f4eedq\""
  },
  "status": 500
}
```

---

## 4. ❌ Error Codes Reference

| Status Code                                                                                       | Error Code           | Description                | Solution                                    |
| ------------------------------------------------------------------------------------------------- | -------------------- | -------------------------- | ------------------------------------------- |
| <span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 4px;">400</span> | `BAD_REQUEST`        | Invalid request parameters | Check parameter format and required fields  |
| <span style="background: #fd7e14; color: white; padding: 2px 8px; border-radius: 4px;">401</span> | `UNAUTHORIZED`       | Missing or invalid API key | Verify `x-api-key` header is correct        |
| <span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 4px;">404</span> | `UNIVERSE_NOT_FOUND` | Universe does not exist    | Check `bundleId` or `universeId` is correct |
| <span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 4px;">500</span> | `22P02`              | Invalid UUID format        | Ensure all IDs are valid UUID format        |

---

## 5. 🛠️ Troubleshooting

### Common Issues

<details>
<summary><strong>🔍 "Universe not found" error</strong></summary>

**Problem**: Getting `UNIVERSE_NOT_FOUND` error when creating sessions.

**Solutions**:

- Verify the `bundleId` exists in your account
- Check if the universe is active and not deleted
- Ensure you're using the correct API environment (staging vs production)
</details>

<details>
<summary><strong>🔑 Authentication failures</strong></summary>

**Problem**: Getting unauthorized errors despite having an API key.

**Solutions**:

- Ensure `x-api-key` header is included in all requests
- Verify the API key is active and not expired
- Check if the API key has the correct permissions
</details>

<details>
<summary><strong>📝 Invalid UUID errors</strong></summary>

**Problem**: Getting `22P02` or "invalid input syntax for type uuid" errors.

**Solutions**:

- Ensure all ID parameters are valid UUIDs (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- Don't include extra quotes or spaces in UUID values
- Use the exact IDs returned from previous API calls
</details>

<details>
<summary><strong>🔄 Chat pagination is not working.</strong></summary>

**Problem**: Cursor and direction parameters being ignored.

**Solutions**:

- Always provide both `cursor` AND `direction` parameters together
- Use message IDs returned from previous API calls as cursor values
- Ensure direction is either `"before"` or `"after"`
</details>

---

## 6. 📞 Support

- **API Version**: v3
- **Documentation Updated**: 2025-08-10

---
