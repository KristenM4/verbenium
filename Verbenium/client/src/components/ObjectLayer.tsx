import type { GameObjectPlacement } from "../types/game";

interface Props {
  placements: GameObjectPlacement[];
}

export function ObjectLayer({ placements }: Props) {
  if (placements.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {placements.map((placement, index) => {
        const { object } = placement;
        const height = placement.height ?? object.defaultHeight;
        const width = placement.width ?? object.defaultWidth;

        return (
          <img
            key={index}
            src={`/${object.imageUrl}`}
            alt={object.name}
            className="absolute"
            style={{
              left: `${placement.posX}%`,
              top: `${placement.posY}%`,
              height: height != null ? `${height}%` : "auto",
              width: width != null ? `${width}%` : "auto",
            }}
          />
        );
      })}
    </div>
  );
}
