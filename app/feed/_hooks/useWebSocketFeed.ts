import { useEffect, useRef, useState } from "react";
import { FeedEvent } from "../types";

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

const WS_URL = "ws://localhost:8080";

export function useWebSocketFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  const wsRef = useRef<WebSocket | null>(null);
  const retryCount = useRef(0);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    let isUnmounted = false;

    const connect = () => {
      setStatus(retryCount.current > 0 ? "reconnecting" : "connecting");

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        retryCount.current = 0;
        if (!isUnmounted) setStatus("connected");
      };

      ws.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);

          if (
            typeof data?.id !== "string" ||
            typeof data?.title !== "string" ||
            typeof data?.body !== "string" ||
            typeof data?.timestamp !== "number"
          ) {
            return;
          }

          //   Duplicate event check
          if (seenIds.current.has(data.id)) return;

          seenIds.current.add(data.id);

          if (!isUnmounted) {
            setEvents((prev) => [data, ...prev]);
          }
        } catch {
          // Malformed message — ignored safely
        }
      };

      ws.onclose = () => {
        if (isUnmounted) return;

        setStatus("disconnected");
        retryCount.current += 1;
        // Exponential backoff with max delay to avoid aggressive reconnect loops
        const delay = Math.min(1000 * 2 ** retryCount.current, 10_000);
        setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      wsRef.current?.close();
    };
  }, []);

  return { events, status };
}
