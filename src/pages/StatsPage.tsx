import { MOCK_ITEMS } from "@/data/mockData";
import { BookOpen, Tv, Gamepad2, Film, BarChart3, CalendarDays, Clock } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

const StatsPage = () => {
  const completed = MOCK_ITEMS.filter((i) => i.status === "completed");
  const inProgress = MOCK_ITEMS.filter((i) => ["watching", "reading", "playing"].includes(i.status));

  const tvCount = MOCK_ITEMS.filter((i) => i.type === "tv" || i.type === "anime").length;
  const movieCount = MOCK_ITEMS.filter((i) => i.type === "movie").length;
  const bookCount = MOCK_ITEMS.filter((i) => i.type === "book").length;
  const gameCount = MOCK_ITEMS.filter((i) => i.type === "game").length;

  const stats = [
    { icon: Tv, label: "Shows & Anime", count: tvCount },
    { icon: Film, label: "Movies", count: movieCount },
    { icon: BookOpen, label: "Books", count: bookCount },
    { icon: Gamepad2, label: "Games", count: gameCount },
  ];

  const avgRating = MOCK_ITEMS.filter((i) => i.rating).reduce((sum, i) => sum + (i.rating || 0), 0) / MOCK_ITEMS.filter((i) => i.rating).length;

  // Compute avg completion time for items with both dates
  const completedWithDates = completed.filter((i) => i.startedAt && i.finishedAt);
  const avgCompletionDays = completedWithDates.length > 0
    ? completedWithDates.reduce((sum, i) => sum + differenceInDays(parseISO(i.finishedAt!), parseISO(i.startedAt!)), 0) / completedWithDates.length
    : null;

  // Tag frequency
  const tagCounts: Record<string, number> = {};
  MOCK_ITEMS.forEach((i) => i.tags?.forEach((t) => {
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  }));
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

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

      {/* Completion speed */}
      {avgCompletionDays !== null && (
        <div className="rounded-xl bg-card p-4 mb-6 flex items-center gap-3">
          <Clock size={20} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Avg. Completion Time</p>
            <p className="font-display text-xl font-bold">{Math.round(avgCompletionDays)} days</p>
          </div>
        </div>
      )}

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

      {/* Top tags */}
      {topTags.length > 0 && (
        <>
          <h2 className="text-lg font-display font-semibold mb-3">Top Tags</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {topTags.map(([tag, count]) => (
              <span
                key={tag}
                className="rounded-full bg-shelf-warm px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {tag} <span className="text-muted-foreground">({count})</span>
              </span>
            ))}
          </div>
        </>
      )}

      {/* Year in review */}
      <div className="rounded-xl bg-shelf-amber-light p-6 text-center">
        <BarChart3 size={32} className="mx-auto mb-2 text-primary" />
        <h3 className="font-display text-lg font-semibold">2024 in Review</h3>
        <p className="text-sm text-muted-foreground mt-1">Coming soon — your year in entertainment.</p>
      </div>
    </div>
  );
};

export default StatsPage;
