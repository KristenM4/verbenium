import { useState, useEffect } from "react";
import type { GameNode, ImageState, FetchError } from "../types/game";

export function useGameNode(slug: string) {
  const [gameNode, setGameNode] = useState<GameNode | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    current: null,
    next: null,
    isFading: false,
  });
  const [error, setError] = useState<FetchError | null>(null);
  const [retryCounter, setRetryCounter] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchPath = slug === "/" ? "" : slug;

    const load = async () => {
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/${fetchPath}`,
        );
        if (cancelled) return;

        if (!response.ok) {
          setError({
            message: `${response.status} ${response.statusText}`.trim(),
            status: response.status,
          });
          return;
        }

        const data: GameNode = await response.json();
        if (cancelled) return;

        const newImage = data.imageUrl ? `/backgrounds/${data.imageUrl}` : null;

        if (!imageState.current || !newImage) {
          setImageState((prev) => ({ ...prev, current: newImage }));
          setGameNode(data);
          return;
        }

        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          setImageState((prev) => ({
            current: prev.current,
            next: newImage,
            isFading: true,
          }));
          setTimeout(() => {
            if (cancelled) return;
            setImageState({ current: newImage, next: null, isFading: false });
            setGameNode(data);
          }, 300);
        };
        img.onerror = () => {
          if (cancelled) return;
          console.error("Failed to load image:", newImage);
          setImageState((prev) => ({ ...prev, current: null }));
          setGameNode(data);
        };
        img.src = newImage;
      } catch (err) {
        if (cancelled) return;
        setError({
          message: err instanceof Error ? err.message : "Network error",
        });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCounter]);

  const retry = () => setRetryCounter((c) => c + 1);

  return { gameNode, imageState, error, retry };
}
