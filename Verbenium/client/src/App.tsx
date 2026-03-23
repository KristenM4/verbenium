import { useState, useEffect } from 'react'
import type { GameNode } from './types/game';

function App() {
    const [gameNode, setGameNode] = useState<GameNode | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [nextImage, setNextImage] = useState<string | null>(null);
    const [isFading, setIsFading] = useState(false);

    const fetchNode = async (path: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${path}`);
            const data = await response.json();

            const newImage = data.imageUrl
                ? `/level/${data.imageUrl}`
                : null;

            if (!currentImage) {
                setCurrentImage(newImage);
                setGameNode(data);
                return;
            }

            if (newImage) {
                const img = new Image();
                img.src = newImage;

                img.onload = () => {
                    setNextImage(newImage);   // load into top layer
                    setIsFading(true);

                    // wait for fade to finish
                    setTimeout(() => {
                        setCurrentImage(newImage);
                        setNextImage(null);
                        setIsFading(false);
                        setGameNode(data);
                    }, 300);
                };
            } else {
                setGameNode(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchNode("");
    }, []);

    if (!gameNode) return <div>Loading...</div>;

    return (
        <div className="mx-auto flex h-dvh w-full max-w-[900px] flex-col items-center gap-2 text-center">
            <img className="mx-auto w-full max-w-80" src="/verbenium_title.png" alt="Verbenium" />

            <div className="relative mx-auto max-h-[600px] w-full flex-shrink-0">
                {currentImage && (
                    <img
                        src={currentImage}
                        className="block w-full"
                    />
                )}

                {/* Next image (fades in on top) */}
                {nextImage && (
                    <img
                        src={nextImage}
                        className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                            isFading ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}
            </div>

            <p>{gameNode.description}</p>

            {gameNode.actions && gameNode.actions.length > 0 && (
                <ul className="flex flex-row gap-2">
                    {gameNode.actions.map((action, index) => (
                        <li key={index}>
                            <button
                                onClick={() => fetchNode(action.url)}
                                className="cursor-pointer rounded-sm bg-stone-400 px-3 py-1 hover:bg-stone-300">
                                {action.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App
