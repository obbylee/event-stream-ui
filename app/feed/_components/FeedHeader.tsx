import { ConnectionStatus } from "../_hooks/useWebSocketFeed";
import { cn } from "@/lib/utils";

interface Props {
  status: ConnectionStatus;
}

export default function FeedHeader({ status }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Real-Time Activity Feed</h1>
      <span
        className={cn(
          "text-sm",
          status === "connected" && "text-green-600",
          status === "reconnecting" && "text-yellow-600",
          status === "disconnected" && "text-red-600"
        )}
      >
        ● {status}
      </span>
    </div>
  );
}
