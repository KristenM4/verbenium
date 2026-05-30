import type { GameNode, ImageState } from "./game";

export interface PageProps {
  gameNode: GameNode;
  imageState: ImageState;
  usesSprite: boolean;
}
