import { Button } from "@/components/ui/button";
import { FeedType } from "../types";

interface Props {
  value: FeedType | "all";
  onChange: (value: FeedType | "all") => void;
}

const feeds: (FeedType | "all")[] = ["all", "news", "market", "price"];

export default function FeedTabs({ value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {feeds.map((feed) => (
        <Button
          key={feed}
          variant={value === feed ? "default" : "outline"}
          onClick={() => onChange(feed)}
        >
          {feed.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
