interface Props {
  current: string | null;
  next: string | null;
  isFading: boolean;
  usesSprite: boolean;
}

export function ImageCrossfade({ current, next, isFading, usesSprite }: Props) {
  if (!current && !next) return null;
  return (
    <div className="relative mx-auto w-full flex-shrink-0">
      {current && (
        <div className="relative">
          <img src={current} className="game-img block w-full" />
          {usesSprite && (
            <img
              className="absolute h-2/12 bottom-5/12 left-5/12"
              src="player-sprite/sprite-basic.png"
            />
          )}
        </div>
      )}
      {next && (
        <div>
          <img
            src={next}
            className={`absolute top-0 left-0 w-full transition-opacity game-img duration-300 ${
              isFading ? "opacity-100" : "opacity-0"
            }`}
          />
          {usesSprite && (
            <img
              src="player-sprite/sprite-basic.png"
              className={`absolute h-2/12 bottom-5/12 left-5/12 transition-opacity duration-300 ${
                isFading ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
}
