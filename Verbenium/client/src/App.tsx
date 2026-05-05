import { useGameNode } from "./hooks/useGameNode";
import { HomePage } from "./pages/HomePage";
import { LevelPage } from "./pages/LevelPage";
import { ErrorBanner } from "./components/ErrorBanner";

function App() {
  const { gameNode, imageState, fetchNode, error, retry } = useGameNode();

  if (!gameNode) {
    if (error) return <ErrorBanner error={error} onRetry={retry} />;
    return (
      <div className="container my-12 text-center text-lg">Loading...</div>
    );
  }

  return (
    <div>
      <ErrorBanner error={error} onRetry={retry} />
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
