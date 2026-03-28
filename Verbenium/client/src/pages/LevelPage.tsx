import type { PageProps } from '../types/pageProps';
import { ImageCrossfade } from '../components/ImageCrossfade';
import { ActionList } from '../components/ActionList';

export function LevelPage({ gameNode, imageState, fetchNode }: PageProps) {
    return (
        <div className="container mb-12 gap-2">
            <img className="mx-auto w-full max-w-40 xl:mr-auto xl:ml-0" src="/verbenium_title.png" alt="Verbenium" />
            <div className="game-container">
                <div className="flex flex-col items-center gap-4 p-4 text-start xl:col-span-2 xl:gap-6 xl:px-5 xl:py-12">
                    <p className="xl:mb-auto">{gameNode.description}</p>
                    <ActionList actions={gameNode.actions ?? []} onAction={fetchNode} />
                </div>
                <div className="xl:col-span-4">
                    <ImageCrossfade {...imageState} />
                </div>
            </div>
        </div>
    );
}