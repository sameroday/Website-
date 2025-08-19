import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  "data-testid"?: string;
}

export function StarRating({ value, onChange, "data-testid": testId }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number>(0);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-2" data-testid={testId}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`text-4xl transition-all duration-200 hover:scale-110 ${
            star <= (hoverValue || value)
              ? "text-yellow-400 drop-shadow-lg"
              : "text-gray-500"
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          data-testid={`star-${star}`}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}
