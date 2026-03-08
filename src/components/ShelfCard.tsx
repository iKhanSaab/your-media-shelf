import { ShelfItem, getProgressLabel } from "@/data/types";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";
import ContentTypeBadge from "./ContentTypeBadge";
import { useNavigate } from "react-router-dom";

interface ShelfCardProps {
  item: ShelfItem;
}

const ShelfCard = ({ item }: ShelfCardProps) => {
  const navigate = useNavigate();
  const progress = getProgressLabel(item);

  return (
    <div
      onClick={() => navigate(`/item/${item.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <img
          src={item.coverUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <StatusBadge status={item.status} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 pt-8">
          {progress && (
            <span className="text-[11px] font-medium text-primary-foreground/80">{progress}</span>
          )}
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="font-display text-sm font-semibold leading-tight line-clamp-2">{item.title}</h3>
        <div className="flex items-center gap-2">
          <ContentTypeBadge type={item.type} showLabel={false} size={12} />
          {item.rating && <StarRating rating={item.rating} size={12} />}
        </div>
      </div>
    </div>
  );
};

export default ShelfCard;
