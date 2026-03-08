export type ContentType = "tv" | "movie" | "book" | "anime" | "podcast" | "game";

export type ContentStatus = "watching" | "reading" | "playing" | "completed" | "on_hold" | "dropped" | "plan";

export interface ShelfItem {
  id: string;
  title: string;
  type: ContentType;
  coverUrl: string;
  status: ContentStatus;
  rating?: number;
  progress?: {
    season?: number;
    episode?: number;
    chapter?: number;
    page?: number;
    percent?: number;
  };
  genre?: string[];
  tags?: string[];
  notes?: string;
  addedAt: string;
  startedAt?: string;
  finishedAt?: string;
  queued?: boolean;
}

export interface ShelfList {
  id: string;
  name: string;
  description?: string;
  itemIds: string[];
  createdAt: string;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  tv: "TV Series",
  movie: "Movie",
  book: "Book",
  anime: "Anime",
  podcast: "Podcast",
  game: "Game",
};

export const STATUS_LABELS: Record<ContentStatus, string> = {
  watching: "Watching",
  reading: "Reading",
  playing: "Playing",
  completed: "Completed",
  on_hold: "On Hold",
  dropped: "Dropped",
  plan: "Plan To",
};

export const getActiveVerb = (type: ContentType): ContentStatus => {
  switch (type) {
    case "book": return "reading";
    case "game": return "playing";
    default: return "watching";
  }
};

export const getProgressLabel = (item: ShelfItem): string => {
  if (!item.progress) return "";
  const p = item.progress;
  switch (item.type) {
    case "tv":
    case "anime":
      return p.season ? `S${String(p.season).padStart(2, "0")}E${String(p.episode || 1).padStart(2, "0")}` : `Ep ${p.episode}`;
    case "book":
      return p.chapter ? `Ch. ${p.chapter} · p.${p.page || "?"}` : `p.${p.page}`;
    case "game":
      return p.percent ? `${p.percent}%` : "";
    case "podcast":
      return p.episode ? `Ep ${p.episode}` : "";
    default:
      return "";
  }
};
