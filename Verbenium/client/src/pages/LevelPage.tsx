import type { PageProps } from "../types/pageProps";
import { ImageCrossfade } from "../components/ImageCrossfade";
import { ActionList } from "../components/ActionList";

export function LevelPage({ gameNode, imageState, fetchNode }: PageProps) {
  return (
    <div className="container mb-12 gap-2">
      <img
        className="mx-auto w-full max-w-40 xl:mr-auto xl:ml-0"
        src="/verbenium_title.png"
        alt="Verbenium"
      />
      <div className="game-container">
        <div className="flex flex-col items-center gap-4 p-3 text-start xl:col-span-2 xl:px-5 xl:py-12">
          <p className="xl:mr-auto underline underline-offset-4 decoration-1 tracking-wide select-none">
            Chapter {gameNode.chapter}
          </p>
          <p className="xl:mb-auto min-h-24 max-h-36">{gameNode.description}</p>
          <ActionList actions={gameNode.actions ?? []} onAction={fetchNode} />
        </div>
        <div className="xl:col-span-4">
          <ImageCrossfade {...imageState} />
        </div>
      </div>
    </div>
  );
}
