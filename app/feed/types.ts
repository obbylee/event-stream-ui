export type FeedType = "news" | "market" | "price";

export interface FeedEvent {
  id: string;
  type: FeedType;
  title: string;
  body: string;
  timestamp: number;
}
