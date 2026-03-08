import { getInProgressItems, getCompletedItems, getQueuedItems } from "@/data/mockData";
import ContinueTile from "@/components/ContinueTile";
import ShelfCard from "@/components/ShelfCard";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const HomePage = () => {
  const navigate = useNavigate();
  const inProgress = getInProgressItems();
  const completed = getCompletedItems();
  const queued = getQueuedItems();

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight">SHELF</h1>
        <p className="text-sm text-muted-foreground mt-1">{getGreeting()}. Your entertainment, organized.</p>
      </div>

      {/* This Week Queue */}
      {queued.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={16} className="text-primary" />
            <h2 className="text-lg font-display font-semibold">This Week</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {queued.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="flex-shrink-0 w-28 cursor-pointer group"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[11px] font-medium text-primary-foreground line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Continue */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-semibold mb-3">Continue</h2>
        <div className="space-y-2">
          {inProgress.map((item) => (
            <ContinueTile key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Recently Completed */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-3">Recently Completed</h2>
        <div className="grid grid-cols-3 gap-3">
          {completed.slice(0, 6).map((item) => (
            <ShelfCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
