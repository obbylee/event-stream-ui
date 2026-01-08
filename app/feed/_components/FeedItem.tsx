import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeedEvent } from "../types";

interface Props {
  event: FeedEvent;
}

export default function FeedItem({ event }: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{event.type}</Badge>
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
