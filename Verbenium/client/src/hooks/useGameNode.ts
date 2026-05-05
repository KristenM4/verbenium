import { useState, useRef, useEffect } from "react";
import type { GameNode, ImageState, FetchError } from "../types/game";

export function useGameNode() {
  const [gameNode, setGameNode] = useState<GameNode | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    current: null,
    next: null,
    isFading: false,
  });

  const [error, setError] = useState<FetchError | null>(null);
  const lastPath = useRef<string>("");

  const fetchNode = async (path: string) => {
    lastPath.current = path;
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);

      if (!response.ok) {
        setError({
          message: `${response.status} ${response.statusText}`.trim(),
          status: response.status,
        });
        return;
      }

      const data: GameNode = await response.json();
      const newImage = data.imageUrl ? `/level/${data.imageUrl}` : null;

      if (!imageState.current || !newImage) {
        setImageState((prev) => ({ ...prev, current: newImage }));
        setGameNode(data);
        return;
      }

      const img = new Image();
      img.src = newImage;
      img.onload = () => {
        setImageState({
          current: imageState.current,
          next: newImage,
          isFading: true,
        });
        setTimeout(() => {
          setImageState({ current: newImage, next: null, isFading: false });
          setGameNode(data);
        }, 300);
      };
      img.onerror = () => {
        console.error("Failed to load image:", newImage);
        setImageState((prev) => ({ ...prev, current: null }));
        setGameNode(data);
      };
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Network error",
      });
    }
  };

  const retry = () => {
    fetchNode(lastPath.current);
  };

  useEffect(() => {
    fetchNode("");
  }, []);

  return { gameNode, imageState, fetchNode, error, retry };
}
