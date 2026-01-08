# Real-Time Multi-Feed Dashboard (Frontend Trial Task)

This project implements a real-time activity feed using **Next.js, React, TypeScript, TailwindCSS, and shadcn/ui**.  
It demonstrates how to design a resilient real-time UI that consumes WebSocket events, handles connection issues, and supports filtering and search.

---

## Features

- Real-time feed powered by WebSocket
- Connection status indicator (connected / reconnecting / disconnected)
- Automatic reconnect with exponential backoff
- Deduplication of incoming events
- Safe handling of malformed WebSocket messages
- Feed filtering via tabs (All, News, Market, Price)
- Client-side search (title + body)
- Scrollable feed designed to handle large datasets
- Strongly typed event and UI state (TypeScript)

---

## Architecture Overview

- **UI-first approach**: The feed UI was built using static mock data to establish layout and state flow.
- **Separation of concerns**:
  - UI components handle rendering only
  - WebSocket logic is isolated in a custom hook
- **Local state + hooks** were chosen over global state for simplicity and clarity.

---

## Project Structure

```
app/feed/
├── page.tsx
├── components/
│   ├── FeedHeader.tsx
│   ├── FeedTabs.tsx
│   ├── SearchInput.tsx
│   ├── FeedList.tsx
│   └── FeedItem.tsx
├── hooks/
│   └── useWebSocketFeed.ts
├── types.ts
└── mock-events.ts
server/
└── mock-ws.ts

```

---

## Running the Project

### 1️⃣ Start the mock WebSocket server

The WebSocket server intentionally sends:

- Duplicate event IDs
- Malformed messages
- Continuous random events

This helps simulate real-world conditions.

```bash
node server/mock-ws.ts
```

Server will run on:

```bash
ws://localhost:8080
```

---

### 2️⃣ Start the Next.js app

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000/feed
```

---

## Resilience & Error Handling

- **Reconnect with backoff**: Exponential delay capped to prevent aggressive reconnect loops
- **Deduplication**: In-memory `Set` prevents duplicate events
- **Malformed messages**: Safely ignored via `try/catch` and shape validation
- **Graceful disconnect handling**: UI remains responsive during reconnects

---

## Performance Considerations

- Filtering and searching are memoized using `useMemo`
- Feed rendering uses a scrollable container
- Virtualized lists (e.g. `react-window`) can be added if the dataset grows significantly

---

## Trade-offs

- Client-side filtering was chosen for simplicity
- No persistent storage layer
- No feed virtualization to keep the implementation focused on core requirements

---

## Notes

This project focuses on **reliability, clarity, and production-style real-time data flow** rather than visual polish.
