import Tree from "./components/tree";
import "./index.css";

function App() {
  return (
    <main className="app">
      <h1>Drag Tree Simulator</h1>

      <Tree />

      <button type="button">Stage</button>
    </main>
  );
}

export default App;