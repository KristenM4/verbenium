import { useGameNode } from "./hooks/useGameNode";
import { HomePage } from "./pages/HomePage";
import { LevelPage } from "./pages/LevelPage";

function App() {
  const { gameNode, imageState, fetchNode } = useGameNode();

  if (!gameNode)
    return (
      <div className="container my-12 text-center text-lg">Loading...</div>
    );

  return (
    <div>
      {gameNode.url === "/" ? (
        <HomePage
          gameNode={gameNode}
          imageState={imageState}
          fetchNode={fetchNode}
        />
      ) : (
        <LevelPage
          gameNode={gameNode}
          imageState={imageState}
          fetchNode={fetchNode}
        />
      )}
    </div>
  );
}

export default App;
