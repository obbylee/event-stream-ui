import { FeedEvent } from "../types";
import FeedItem from "./FeedItem";

interface Props {
  events: FeedEvent[];
}

export default function FeedList({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-12">
        No events found
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-auto space-y-3">
      {events.map((event) => (
        <FeedItem key={event.id} event={event} />
      ))}
    </div>
  );
}
