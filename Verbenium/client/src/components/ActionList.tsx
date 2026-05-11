import { Link } from "react-router";
import type { GameAction } from "../types/game";

interface Props {
  actions: GameAction[];
}

export function ActionList({ actions }: Props) {
  if (!actions.length) return null;
  return (
    <ul className="flex flex-row gap-2">
      {actions.map((action, index) => (
        <li key={index}>
          <Link
            to={action.url === "/" ? "/" : `/${action.url}`}
            className="btn no-underline"
          >
            {action.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
