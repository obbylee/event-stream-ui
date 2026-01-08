import { FeedEvent } from "./types";

export const mockEvents: FeedEvent[] = [
  {
    id: "1",
    type: "news",
    title: "Market opens higher",
    body: "Global markets opened higher amid positive economic data.",
    timestamp: Date.now() - 1000 * 60,
  },
  {
    id: "2",
    type: "market",
    title: "Large buy order detected",
    body: "A $1.2M buy order was executed on BTC-USDT.",
    timestamp: Date.now() - 1000 * 120,
  },
  {
    id: "3",
    type: "price",
    title: "BTC price movement",
    body: "BTC moved from $42,000 to $43,200.",
    timestamp: Date.now() - 1000 * 300,
  },
];
