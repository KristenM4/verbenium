import { useState, useEffect } from 'react'

interface GameNode {
    description: string;
    actions: string[];
}

function App() {
    const [gameNode, setGameNode] = useState<GameNode | null>(null);

    const fetchNode = (path: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/${path}`)
            .then((response) => response.json())
            .then((data) => setGameNode(data))
            .catch((error) => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchNode("");
    }, []);

    if (!gameNode) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center text-center">
            <img className="mx-auto w-full max-w-96" src="/verbenium_title.png" alt="Verbenium" />
            <p>{gameNode.description}</p>

            {gameNode.actions && gameNode.actions.length > 0 && (
                <ul className="my-5">
                    {gameNode.actions.map((action, index) => (
                        <li key={index}>
                            <button
                                onClick={() => fetchNode(action)}
                                className="cursor-pointer rounded-sm bg-stone-400 px-3 py-1 hover:bg-stone-300">
                                {action}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App
