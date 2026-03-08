import { ShelfItem, getProgressLabel } from "@/data/types";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContinueTileProps {
  item: ShelfItem;
}

const ContinueTile = ({ item }: ContinueTileProps) => {
  const navigate = useNavigate();
  const progress = getProgressLabel(item);

  return (
    <div
      onClick={() => navigate(`/item/${item.id}`)}
      className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm cursor-pointer transition-all hover:shadow-md hover:bg-shelf-warm"
    >
      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
        <img src={item.coverUrl} alt={item.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-sm font-semibold truncate">{item.title}</h4>
        <p className="text-xs text-muted-foreground">{progress}</p>
      </div>
      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
        <Play size={14} className="ml-0.5" />
      </div>
    </div>
  );
};

export default ContinueTile;
