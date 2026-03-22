import { useState, useEffect } from 'react'

interface GameNode {
    description: string;
    actions: string[];
}

function App() {
    const [gameNode, setGameNode] = useState<GameNode | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/`)
            .then((response) => response.json())
            .then((data) => setGameNode(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!gameNode) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center text-center">
            <img className="mx-auto w-full max-w-96" src="/verbenium_title.png" alt="Verbenium" />
            <p>{gameNode.description}</p>

            {gameNode.actions && gameNode.actions.length > 0 && (
                <ul>
                    {gameNode.actions.map((action, index) => (
                        <li key={index}>
                            <button>{action}</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App
