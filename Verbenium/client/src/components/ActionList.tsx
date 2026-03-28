import type { GameAction } from "../types/game";

interface Props {
  actions: GameAction[];
  onAction: (url: string) => void;
}

export function ActionList({ actions, onAction }: Props) {
  if (!actions.length) return null;
  return (
    <ul className="flex flex-row gap-2">
      {actions.map((action, index) => (
        <li key={index}>
          <button onClick={() => onAction(action.url)} className="btn">
            {action.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
