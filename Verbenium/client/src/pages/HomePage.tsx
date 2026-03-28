import type { PageProps } from '../types/pageProps';
import { ImageCrossfade } from '../components/ImageCrossfade';
import { ActionList } from '../components/ActionList';

export function HomePage({ gameNode, imageState, fetchNode }: PageProps) {

    return (
        <div className="container">
            <img className="mx-auto w-full max-w-80" src="/verbenium_title.png" alt="Verbenium" />
            <div className="flex flex-col items-center gap-4 py-5">
                <p>{gameNode.description}</p>
                <ActionList actions={gameNode.actions ?? []} onAction={fetchNode} />
            </div>
            <ImageCrossfade {...imageState} />
        </div>
    );
}