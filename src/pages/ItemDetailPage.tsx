import { useParams, useNavigate } from "react-router-dom";
import { getItemById } from "@/data/mockData";
import { getProgressLabel, STATUS_LABELS, ContentStatus } from "@/data/types";
import StarRating from "@/components/StarRating";
import ContentTypeBadge from "@/components/ContentTypeBadge";
import StatusBadge from "@/components/StatusBadge";
import { ArrowLeft, StickyNote } from "lucide-react";

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id || "");

  if (!item) {
    return (
      <div className="pb-24 px-4 pt-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">Item not found.</p>
      </div>
    );
  }

  const progress = getProgressLabel(item);

  return (
    <div className="pb-24 max-w-lg mx-auto">
      {/* Hero cover */}
      <div className="relative">
        <div className="aspect-[3/2] overflow-hidden">
          <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover blur-sm scale-110 opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center justify-center h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm text-foreground"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex gap-4">
          <div className="h-36 w-24 flex-shrink-0 overflow-hidden rounded-lg shadow-xl">
            <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-end min-w-0">
            <ContentTypeBadge type={item.type} />
            <h1 className="font-display text-2xl font-bold mt-1 leading-tight">{item.title}</h1>
            {item.genre && (
              <p className="text-xs text-muted-foreground mt-1 truncate">{item.genre.join(" · ")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">
        {/* Status + Rating row */}
        <div className="flex items-center justify-between">
          <StatusBadge status={item.status} className="text-xs" />
          <StarRating rating={item.rating || 0} size={20} />
        </div>

        {/* Progress */}
        {progress && (
          <div className="rounded-xl bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Progress</p>
            <p className="font-display text-xl font-semibold">{progress}</p>
            {item.type === "game" && item.progress?.percent && (
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.progress.percent}%` }} />
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {item.notes && (
          <div className="rounded-xl bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <StickyNote size={14} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Notes</p>
            </div>
            <p className="text-sm leading-relaxed">{item.notes}</p>
          </div>
        )}

        {/* Status options */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">Set Status</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS_LABELS) as ContentStatus[]).map((s) => (
              <button
                key={s}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.status === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-shelf-warm"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
