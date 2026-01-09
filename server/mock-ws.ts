import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Mock WebSocket server running on ws://localhost:8080");

const FEEDS = ["news", "market", "price"] as const;

const EVENTS = {
  news: [
    {
      title: "Federal Reserve signals rate pause",
      body: "The Fed indicated it may pause rate hikes amid cooling inflation.",
    },
    {
      title: "Tech stocks lead market rally",
      body: "Major tech stocks gained after strong earnings reports.",
    },
  ],
  market: [
    {
      title: "Large BTC buy order executed",
      body: "A $1.2M BTC-USDT buy order was filled on Binance.",
    },
    {
      title: "High sell pressure detected",
      body: "Increased sell volume detected on ETH markets.",
    },
  ],
  price: [
    {
      title: "BTC price movement",
      body: "BTC moved from $42,000 to $43,200 in the last 5 minutes.",
    },
    {
      title: "ETH volatility spike",
      body: "ETH price fluctuated by 3.4% within 10 minutes.",
    },
  ],
};

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    const shouldSendInvalid = Math.random() < 0.1;
    const shouldDuplicate = Math.random() < 0.2;

    if (shouldSendInvalid) {
      ws.send("INVALID_JSON");
      return;
    }
    const type = FEEDS[Math.floor(Math.random() * FEEDS.length)];
    const samples = EVENTS[type];
    const sample = samples[Math.floor(Math.random() * samples.length)];

    const event = {
      id: shouldDuplicate ? "duplicate-id" : crypto.randomUUID(),
      type: FEEDS[Math.floor(Math.random() * FEEDS.length)],
      title: sample.title,
      body: sample.body,
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(event));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
