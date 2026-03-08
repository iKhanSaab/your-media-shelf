import { ContentStatus, STATUS_LABELS } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ContentStatus, string> = {
  watching: "bg-primary/15 text-primary border-primary/30",
  reading: "bg-primary/15 text-primary border-primary/30",
  playing: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-green-100 text-green-800 border-green-300",
  on_hold: "bg-secondary text-secondary-foreground border-border",
  dropped: "bg-destructive/10 text-destructive border-destructive/30",
  plan: "bg-shelf-amber-light text-muted-foreground border-border",
};

interface StatusBadgeProps {
  status: ContentStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold uppercase tracking-wider", STATUS_STYLES[status], className)}>
      {STATUS_LABELS[status]}
    </Badge>
  );
};

export default StatusBadge;
