import { useState } from "react";
import { MOCK_ITEMS } from "@/data/mockData";
import { ContentType, ContentStatus, CONTENT_TYPE_LABELS, STATUS_LABELS } from "@/data/types";
import ShelfCard from "@/components/ShelfCard";

const ALL_TYPES: (ContentType | "all")[] = ["all", "tv", "movie", "book", "anime", "podcast", "game"];
const ALL_STATUSES: (ContentStatus | "all")[] = ["all", "watching", "reading", "playing", "completed", "on_hold", "dropped", "plan"];

const MyShelfPage = () => {
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");

  const filtered = MOCK_ITEMS.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-display font-bold mb-4">My Shelf</h1>

      {/* Type filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {ALL_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              typeFilter === t
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-shelf-warm"
            }`}
          >
            {t === "all" ? "All" : CONTENT_TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-foreground text-background"
                : "bg-card text-muted-foreground hover:bg-shelf-warm"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {filtered.map((item) => (
          <ShelfCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="font-display text-lg">Nothing here yet</p>
          <p className="text-sm mt-1">Add something to your shelf!</p>
        </div>
      )}
    </div>
  );
};

export default MyShelfPage;
