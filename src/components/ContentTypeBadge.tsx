import { ContentType, CONTENT_TYPE_LABELS } from "@/data/types";
import { Tv, Film, BookOpen, Swords, Gamepad2, Mic } from "lucide-react";

const ICONS: Record<ContentType, React.ElementType> = {
  tv: Tv,
  movie: Film,
  book: BookOpen,
  anime: Swords,
  podcast: Mic,
  game: Gamepad2,
};

interface ContentTypeBadgeProps {
  type: ContentType;
  showLabel?: boolean;
  size?: number;
}

const ContentTypeBadge = ({ type, showLabel = true, size = 14 }: ContentTypeBadgeProps) => {
  const Icon = ICONS[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-shelf-warm px-2 py-0.5 text-xs font-medium text-muted-foreground">
      <Icon size={size} />
      {showLabel && CONTENT_TYPE_LABELS[type]}
    </span>
  );
};

export default ContentTypeBadge;
