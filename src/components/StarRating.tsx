import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({ rating, max = 5, size = 16, interactive = false, onChange }: StarRatingProps) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < rating ? "fill-star-filled text-star-filled" : "fill-transparent text-star-empty"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={interactive && onChange ? () => onChange(i + 1) : undefined}
        />
      ))}
    </div>
  );
};

export default StarRating;
