import { useGameNode } from './hooks/useGameNode';
import { ImageCrossfade } from './components/ImageCrossfade';
import { ActionList } from './components/ActionList';

function App() {
    const { gameNode, imageState, fetchNode } = useGameNode();

    if (!gameNode) return <div className="container my-12 text-center text-lg">Loading...</div>;

    return (
        <div className="container mb-12 items-center gap-2 text-center">
            <img className="mx-auto w-full max-w-64" src="/verbenium_title.png" alt="Verbenium" />
            <div className={gameNode.imageUrl ? "game-container" : ""}>
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

export default App
