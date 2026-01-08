"use client";

import { useState, useMemo } from "react";
import { useWebSocketFeed } from "./_hooks/useWebSocketFeed";
import { FeedType } from "./types";
import FeedHeader from "./_components/FeedHeader";
import FeedTabs from "./_components/FeedTabs";
import SearchInput from "./_components/SearchInput";
import FeedList from "./_components/FeedList";

export default function FeedPage() {
  const { events, status } = useWebSocketFeed();
  const [selectedFeed, setSelectedFeed] = useState<FeedType | "all">("all");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFeed = selectedFeed === "all" || event.type === selectedFeed;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.body.toLowerCase().includes(search.toLowerCase());

      return matchesFeed && matchesSearch;
    });
  }, [selectedFeed, search]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <FeedHeader status={status} />

      <div className="flex items-center justify-between gap-4">
        <FeedTabs value={selectedFeed} onChange={setSelectedFeed} />
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <FeedList events={filteredEvents} />
    </div>
  );
}
