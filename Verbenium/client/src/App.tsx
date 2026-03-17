import { useState, useEffect } from 'react'

interface GameNode {
    description: string;
    actions: string[];
}

function App() {
    const [gameNode, setGameNode] = useState<GameNode | null>(null);

    useEffect(() => {
        fetch('https://localhost:7185/')
            .then((response) => response.json())
            .then((data) => setGameNode(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (!gameNode) return <div>Loading...</div>;

    return (
        <div>
            <h1>Verbenium</h1>
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
