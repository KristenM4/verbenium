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
        <div>
            <img src="src/images/verbenium_title.png" alt="Verbenium" style={{ width:"350px" }} />
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
