export type FeedType = "news" | "market" | "price";

export interface FeedEvent {
  id: string;
  type: FeedType;
  title: string;
  body: string;
  timestamp: number;
  feed: Exclude<FeedType, "all">;
}

export const FEED_META: Record<
  Exclude<FeedType, "all">,
  {
    label: string;
    badgeClass: string;
    icon: string;
  }
> = {
  news: {
    label: "News",
    badgeClass: "bg-blue-100 text-blue-700",
    icon: "📰",
  },
  market: {
    label: "Market",
    badgeClass: "bg-green-100 text-green-700",
    icon: "📈",
  },
  price: {
    label: "Price",
    badgeClass: "bg-orange-100 text-orange-700",
    icon: "💰",
  },
};
