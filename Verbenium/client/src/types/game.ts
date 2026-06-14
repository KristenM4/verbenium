export interface GameAction {
  label: string;
  url: string;
}

export interface GameNode {
  url: string;
  chapter?: number;
  description: string;
  imageUrl?: string;
  usesSprite?: boolean;
  actions: GameAction[];
  placements: GameObjectPlacement[];
}

export interface GameObject {
  name: string;
  imageUrl: string;
  defaultHeight?: number;
  defaultWidth?: number;
  type: string;
}

export interface GameObjectPlacement {
  gameNodeId: number;
  gameObjectId: number;
  object: GameObject;
  posX: number;
  posY: number;
  height?: number;
  width?: number;
}

export interface ImageState {
  current: string | null;
  next: string | null;
  isFading: boolean;
}

export interface FetchError {
  message: string;
  status?: number;
}

export type FetchResult =
  | { data: GameNode; error?: never }
  | { data?: never; error: FetchError };
