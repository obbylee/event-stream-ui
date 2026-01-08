interface Props {
  status: "connected" | "reconnecting" | "disconnected";
}

export default function FeedHeader({ status }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Real-Time Activity Feed</h1>
      <span className="text-sm text-green-600">● {status}</span>
    </div>
  );
}
