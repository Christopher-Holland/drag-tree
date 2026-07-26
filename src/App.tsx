import { useState } from "react";
import Tree from "./components/Tree.tsx";

function App() {
  const [stageStep, setStageStep] = useState(0);

  function handleStage() {
    setStageStep((currentStep) => {
      if (currentStep >= 2) {
        return 0;
      }

      return currentStep + 1;
    });
  }

  return (
    <main className="app">
      <h1>Drag Tree Simulator</h1>

      <Tree
        preStageLit={stageStep >= 1}
        stageLit={stageStep >= 2}
      />

      <button type="button" onClick={handleStage}>
        {stageStep === 0
          ? "Pre-Stage"
          : stageStep === 1
            ? "Stage"
            : "Reset"}
      </button>
    </main>
  );
}

export default App;