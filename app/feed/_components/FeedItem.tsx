import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeedEvent, FEED_META } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  event: FeedEvent;
}

export default function FeedItem({ event }: Props) {
  const meta = FEED_META[event.type];
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={cn("text-xs px-2 py-0.5 rounded", meta.badgeClass)}
          >
            {meta.icon} {meta.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(event.timestamp).toLocaleTimeString()}
          </span>
        </div>

        <h3 className="font-medium">{event.title}</h3>
        <p className="text-sm text-muted-foreground">{event.body}</p>
      </CardContent>
    </Card>
  );
}
