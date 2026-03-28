import type { GameNode, ImageState } from "./game";

export interface PageProps {
  gameNode: GameNode;
  imageState: ImageState;
  fetchNode: (url: string) => void;
}
