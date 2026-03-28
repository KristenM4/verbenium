import { useState, useEffect } from "react";
import type { GameNode, ImageState } from "../types/game";

export function useGameNode() {
  const [gameNode, setGameNode] = useState<GameNode | null>(null);
  const [imageState, setImageState] = useState<ImageState>({
    current: null,
    next: null,
    isFading: false,
  });

  const fetchNode = async (path: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);
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
    } catch (error) {
      console.error("Error fetching node:", error);
    }
  };

  useEffect(() => {
    fetchNode("");
  }, []);

  return { gameNode, imageState, fetchNode };
}
