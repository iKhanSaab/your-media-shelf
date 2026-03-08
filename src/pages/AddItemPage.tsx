import { useState } from "react";
import { Search } from "lucide-react";
import { MOCK_ITEMS } from "@/data/mockData";
import { CONTENT_TYPE_LABELS, ContentType } from "@/data/types";
import ContentTypeBadge from "@/components/ContentTypeBadge";
import { useNavigate } from "react-router-dom";

const SUGGESTIONS = [
  { title: "Severance", type: "tv" as ContentType, year: "2022" },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", type: "book" as ContentType, year: "2022" },
  { title: "Cyberpunk 2077", type: "game" as ContentType, year: "2020" },
  { title: "Vinland Saga", type: "anime" as ContentType, year: "2019" },
  { title: "The Bear", type: "tv" as ContentType, year: "2022" },
  { title: "Hades", type: "game" as ContentType, year: "2020" },
];

const AddItemPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = query.length > 0
    ? MOCK_ITEMS.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-display font-bold mb-4">Add to Shelf</h1>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search movies, books, games, anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl bg-card border border-border pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Search results */}
      {results.length > 0 && (
        <div className="space-y-2 mb-6">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/item/${item.id}`)}
              className="flex items-center gap-3 rounded-xl bg-card p-3 cursor-pointer hover:bg-shelf-warm transition-colors"
            >
              <div className="h-14 w-10 flex-shrink-0 overflow-hidden rounded-md">
                <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                <ContentTypeBadge type={item.type} size={12} />
              </div>
            </div>
          ))}
        </div>
      )}

      {query.length === 0 && (
        <>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Suggested</p>
          <div className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 rounded-xl bg-card p-3 cursor-pointer hover:bg-shelf-warm transition-colors"
              >
                <div className="h-10 w-10 flex-shrink-0 rounded-md bg-shelf-warm flex items-center justify-center">
                  <ContentTypeBadge type={s.type} showLabel={false} size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{s.title}</h4>
                  <p className="text-xs text-muted-foreground">{CONTENT_TYPE_LABELS[s.type]} · {s.year}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddItemPage;
