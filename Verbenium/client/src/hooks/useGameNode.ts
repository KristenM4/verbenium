import { useState, useEffect } from "react";
import type {
  GameNode,
  ImageState,
  FetchError,
  FetchResult,
} from "../types/game";

export function useGameNode(slug: string) {
  const [gameNode, setGameNode] = useState<GameNode | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    current: null,
    next: null,
    isFading: false,
    usesSprite: false,
  });
  const [error, setError] = useState<FetchError | null>(null);
  const [retryCounter, setRetryCounter] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchPath = slug === "/" ? "" : slug;

    const load = async () => {
      setError(null);

      const result = await fetchGameNode(fetchPath);

      if (result.error) {
        setError(result.error);
        return;
      }

      const data: GameNode = result.data;
      if (cancelled) return;

      const newImage = data.imageUrl ? `/backgrounds/${data.imageUrl}` : null;

      if (!imageState.current || !newImage) {
        setImageState((prev) => ({
          ...prev,
          current: newImage,
          usesSprite: data.usesSprite,
        }));
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
          usesSprite: data.usesSprite,
        }));
        setTimeout(() => {
          if (cancelled) return;
          setImageState({
            current: newImage,
            next: null,
            isFading: false,
            usesSprite: data.usesSprite,
          });
          setGameNode(data);
        }, 300);
      };
      img.onerror = () => {
        if (cancelled) return;
        console.error("Failed to load image:", newImage);
        setImageState((prev) => ({
          ...prev,
          current: null,
          usesSprite: data.usesSprite,
        }));
        setGameNode(data);
      };
      img.src = newImage;
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCounter]);

  const retry = () => setRetryCounter((c) => c + 1);

  return { gameNode, imageState, error, retry };
}

async function fetchGameNode(path: string): Promise<FetchResult> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);

    if (!response.ok) {
      return {
        error: {
          message: `${response.status} ${response.statusText}`.trim(),
          status: response.status,
        },
      };
    }

    const data: GameNode = await response.json();
    return { data };
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : "Network error" },
    };
  }
}
