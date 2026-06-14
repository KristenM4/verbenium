import { Routes, Route, useParams } from "react-router";
import { useGameNode } from "./hooks/useGameNode";
import { HomePage } from "./pages/HomePage";
import { LevelPage } from "./pages/LevelPage";
import { ErrorBanner } from "./components/ErrorBanner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameShell />} />
      <Route path="/:slug" element={<GameShell />} />
    </Routes>
  );
}

function GameShell() {
  const { slug } = useParams();
  const currentSlug = slug ?? "/";
  const { gameNode, imageState, error, retry } = useGameNode(currentSlug);

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
        <HomePage gameNode={gameNode} imageState={imageState} />
      ) : (
        <LevelPage gameNode={gameNode} imageState={imageState} />
      )}
    </div>
  );
}

export default App;
