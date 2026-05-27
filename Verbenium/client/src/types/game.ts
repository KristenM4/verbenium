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
}

export interface ImageState {
  current: string | null;
  next: string | null;
  isFading: boolean;
  usesSprite?: boolean;
}

export interface FetchError {
  message: string;
  status?: number;
}

export type FetchResult =
  | { data: GameNode; error?: never }
  | { data?: never; error: FetchError };
