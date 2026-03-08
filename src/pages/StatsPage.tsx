import { MOCK_ITEMS } from "@/data/mockData";
import { BookOpen, Tv, Gamepad2, Film, BarChart3 } from "lucide-react";

const StatsPage = () => {
  const completed = MOCK_ITEMS.filter((i) => i.status === "completed");
  const inProgress = MOCK_ITEMS.filter((i) => ["watching", "reading", "playing"].includes(i.status));

  const tvCount = MOCK_ITEMS.filter((i) => i.type === "tv" || i.type === "anime").length;
  const movieCount = MOCK_ITEMS.filter((i) => i.type === "movie").length;
  const bookCount = MOCK_ITEMS.filter((i) => i.type === "book").length;
  const gameCount = MOCK_ITEMS.filter((i) => i.type === "game").length;

  const stats = [
    { icon: Tv, label: "Shows & Anime", count: tvCount, color: "text-primary" },
    { icon: Film, label: "Movies", count: movieCount, color: "text-primary" },
    { icon: BookOpen, label: "Books", count: bookCount, color: "text-primary" },
    { icon: Gamepad2, label: "Games", count: gameCount, color: "text-primary" },
  ];

  const avgRating = MOCK_ITEMS.filter((i) => i.rating).reduce((sum, i) => sum + (i.rating || 0), 0) / MOCK_ITEMS.filter((i) => i.rating).length;

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-display font-bold mb-6">Activity</h1>

      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold">{MOCK_ITEMS.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Items</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold">{completed.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold">{inProgress.length}</p>
          <p className="text-xs text-muted-foreground mt-1">In Progress</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="font-display text-3xl font-bold">{avgRating.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
        </div>
      </div>

      {/* By type */}
      <h2 className="text-lg font-display font-semibold mb-3">By Type</h2>
      <div className="space-y-3 mb-6">
        {stats.map(({ icon: Icon, label, count }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl bg-card p-4">
            <Icon size={20} className="text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">{label}</p>
            </div>
            <p className="font-display text-xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      {/* Year in review placeholder */}
      <div className="rounded-xl bg-shelf-amber-light p-6 text-center">
        <BarChart3 size={32} className="mx-auto mb-2 text-primary" />
        <h3 className="font-display text-lg font-semibold">2024 in Review</h3>
        <p className="text-sm text-muted-foreground mt-1">Coming soon — your year in entertainment.</p>
      </div>
    </div>
  );
};

export default StatsPage;
