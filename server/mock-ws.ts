import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Mock WebSocket server running on ws://localhost:8080");

const FEEDS = ["news", "market", "price"] as const;

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    const shouldSendInvalid = Math.random() < 0.1;
    const shouldDuplicate = Math.random() < 0.2;

    if (shouldSendInvalid) {
      ws.send("INVALID_JSON");
      return;
    }

    const event = {
      id: shouldDuplicate ? "duplicate-id" : crypto.randomUUID(),
      type: FEEDS[Math.floor(Math.random() * FEEDS.length)],
      title: "Random event",
      body: "Something happened in the system",
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(event));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
