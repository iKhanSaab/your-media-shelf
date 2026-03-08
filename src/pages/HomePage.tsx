import { getInProgressItems, getCompletedItems } from "@/data/mockData";
import ContinueTile from "@/components/ContinueTile";
import ShelfCard from "@/components/ShelfCard";

const HomePage = () => {
  const inProgress = getInProgressItems();
  const completed = getCompletedItems();

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight">SHELF</h1>
        <p className="text-sm text-muted-foreground mt-1">Your entertainment, organized.</p>
      </div>

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
