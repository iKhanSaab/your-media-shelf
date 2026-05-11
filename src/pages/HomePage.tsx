import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, User, ChevronRight, BookOpen } from "lucide-react";
import { MOCK_LISTS, MOCK_ITEMS } from "@/data/mockData";
import { ShelfList, ShelfItem } from "@/data/types";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const PosterCard = ({ item }: { item: ShelfItem }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/item/${item.id}`)}
      className="flex-shrink-0 w-28 group text-left"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted shadow-md transition-all group-hover:shadow-xl group-hover:-translate-y-0.5">
        <img
          src={item.coverUrl}
          alt={item.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-1.5 text-[11px] font-medium leading-tight line-clamp-2">
        {item.title}
      </p>
    </button>
  );
};

const ShelfRow = ({ shelf }: { shelf: ShelfList }) => {
  const navigate = useNavigate();
  const items = shelf.itemIds
    .map((id) => MOCK_ITEMS.find((i) => i.id === id))
    .filter(Boolean) as ShelfItem[];

  return (
    <section className="mb-8">
      <button
        onClick={() => navigate(`/shelf/${shelf.id}`)}
        className="flex items-center gap-1 mb-3 group"
      >
        <h2 className="text-lg font-display font-semibold">{shelf.name}</h2>
        <ChevronRight
          size={18}
          className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
        />
        <span className="ml-2 text-xs text-muted-foreground">
          {items.length}
        </span>
      </button>
      {items.length > 0 ? (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {items.map((it) => (
            <PosterCard key={it.id} item={it} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6 text-center">
          <BookOpen size={20} className="mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Empty shelf</p>
        </div>
      )}
    </section>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [shelves] = useState<ShelfList[]>(MOCK_LISTS);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight leading-none">
              SHELF
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {getGreeting()}
            </p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            aria-label="Profile"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-card border border-border hover:bg-shelf-warm transition-colors"
          >
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Shelves */}
      <main className="max-w-lg mx-auto px-4 pt-6">
        {shelves.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen size={40} className="mx-auto mb-3 text-muted-foreground" />
            <p className="font-display text-lg">No shelves yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Tap + to create your first shelf
            </p>
          </div>
        ) : (
          shelves.map((s) => <ShelfRow key={s.id} shelf={s} />)
        )}
      </main>

      {/* Floating add button */}
      <button
        onClick={() => navigate("/add")}
        aria-label="Add to shelf"
        className="fixed bottom-6 right-1/2 translate-x-1/2 lg:right-8 lg:translate-x-0 z-40 flex items-center gap-2 h-14 px-6 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-transform"
      >
        <Plus size={22} />
        <span className="font-medium text-sm">Add</span>
      </button>
    </div>
  );
};

export default HomePage;
