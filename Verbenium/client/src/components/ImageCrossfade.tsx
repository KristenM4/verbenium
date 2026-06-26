import type { GameObjectPlacement } from "../types/game";
import { ObjectLayer } from "./ObjectLayer";

interface Props {
  current: string | null;
  next: string | null;
  isFading: boolean;
  currentPlacements: GameObjectPlacement[];
  nextPlacements: GameObjectPlacement[];
}

export function ImageCrossfade({
  current,
  next,
  isFading,
  currentPlacements,
  nextPlacements,
}: Props) {
  if (!current && !next) return null;
  return (
    <div className="relative mx-auto w-full flex-shrink-0">
      {current && (
        <div className="relative">
          <img src={current} className="game-img block w-full" />
          <ObjectLayer placements={currentPlacements} />
        </div>
      )}
      {next && (
        <div
          className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
            isFading ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={next} className="game-img block w-full" />
          <ObjectLayer placements={nextPlacements} />
        </div>
      )}
    </div>
  );
}
