export interface GameAction {
    label: string;
    url: string;
}

export interface GameNode {
    url: string;
    description: string;
    imageUrl?: string;
    actions: GameAction[];
}

export interface ImageState {
    current: string | null;
    next: string | null;
    isFading: boolean;
}