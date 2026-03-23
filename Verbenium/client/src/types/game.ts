export interface GameAction {
    label: string;
    url: string;
}

export interface GameNode {
    description: string;
    actions: GameAction[];
}