import { useState, useEffect } from 'react'
import { useGameNode } from './hooks/useGameNode';
import { ImageCrossfade } from './components/ImageCrossfade';
import { ActionList } from './components/ActionList';

function App() {
    const { gameNode, imageState, fetchNode } = useGameNode();

    if (!gameNode) return <div>Loading...</div>;

    return (
        <div className="mx-auto flex h-dvh w-full max-w-[900px] flex-col items-center gap-2 text-center">
            <img className="mx-auto w-full max-w-80" src="/verbenium_title.png" alt="Verbenium" />
            <ImageCrossfade {...imageState} />
            <p>{gameNode.description}</p>
            <ActionList actions={gameNode.actions ?? []} onAction={fetchNode} />
        </div>
    );
}

export default App
