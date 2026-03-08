import { useState } from "react";
import { MOCK_ITEMS, getAllTags } from "@/data/mockData";
import { ContentType, ContentStatus, CONTENT_TYPE_LABELS, STATUS_LABELS } from "@/data/types";
import ShelfCard from "@/components/ShelfCard";
import { Search, Tag, X } from "lucide-react";

const ALL_TYPES: (ContentType | "all")[] = ["all", "tv", "movie", "book", "anime", "podcast", "game"];
const ALL_STATUSES: (ContentStatus | "all")[] = ["all", "watching", "reading", "playing", "completed", "on_hold", "dropped", "plan"];

const MyShelfPage = () => {
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);

  const allTags = getAllTags();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = MOCK_ITEMS.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTags.length > 0 && !selectedTags.some((t) => item.tags?.includes(t))) return false;
    return true;
  });

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-display font-bold mb-4">My Shelf</h1>

      {/* Search bar */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your shelf..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl bg-card border border-border pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

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
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
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

      {/* Tag filter toggle + chips */}
      <div className="mb-4">
        <button
          onClick={() => setShowTags(!showTags)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <Tag size={12} />
          {showTags ? "Hide tags" : "Filter by tags"}
          {selectedTags.length > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-[10px] font-medium ml-1">
              {selectedTags.length}
            </span>
          )}
        </button>
        {showTags && (
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-shelf-warm text-muted-foreground hover:bg-shelf-amber-light"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <X size={10} />
                Clear
              </button>
            )}
          </div>
        )}
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
