import { useState, useEffect, useRef } from "react";
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
    currentPlacements: [],
    nextPlacements: [],
  });
  const [error, setError] = useState<FetchError | null>(null);
  const [retryCounter, setRetryCounter] = useState(0);

  const currentImage = imageState.current;
  const currentImageRef = useRef<string | null>(null);
  useEffect(() => {
    currentImageRef.current = currentImage;
  }, [currentImage]);

  useEffect(() => {
    let cancelled = false;
    const fetchPath = slug === "/" ? "" : slug;

    const load = async () => {
      setError(null);

      const result = await fetchGameNode(fetchPath);
      if (cancelled) return;

      if (result.error) {
        setError(result.error);
        return;
      }

      const data: GameNode = result.data;

      const newImage = data.imageUrl ? `/backgrounds/${data.imageUrl}` : null;

      if (!currentImageRef.current || !newImage) {
        setImageState({
          current: newImage,
          next: null,
          isFading: false,
          currentPlacements: data.placements ?? [],
          nextPlacements: [],
        });
        setGameNode(data);
        return;
      }

      try {
        await preloadImage(newImage);
        if (cancelled) return;

        setImageState((prev) => ({
          current: prev.current,
          next: newImage,
          isFading: true,
          currentPlacements: prev.currentPlacements,
          nextPlacements: data.placements ?? [],
        }));

        setTimeout(() => {
          if (cancelled) return;
          setImageState({
            current: newImage,
            next: null,
            isFading: false,
            currentPlacements: data.placements ?? [],
            nextPlacements: [],
          });
          setGameNode(data);
        }, 300);
      } catch {
        if (cancelled) return;
        console.error("Failed to load image:", newImage);
        setImageState((prev) => ({
          ...prev,
          current: null,
          currentPlacements: [],
        }));
        setGameNode(data);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [slug, retryCounter]);

  console.log(gameNode);

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

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}
