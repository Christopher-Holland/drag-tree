import { useEffect, useRef, useState } from "react";
import Tree from "./components/Tree";

type RaceState =
  | "idle"
  | "pre-staged"
  | "staged"
  | "countdown"
  | "green"
  | "finished"
  | "red-light";

function App() {
  const [raceState, setRaceState] = useState<RaceState>("idle");
  const [amberIndex, setAmberIndex] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const greenTimeRef = useRef<number | null>(null);
  const scheduledGreenTimeRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const preStageLit = raceState !== "idle";

  const stageLit =
    raceState === "staged" ||
    raceState === "countdown" ||
    raceState === "green" ||
    raceState === "finished" ||
    raceState === "red-light";

  const greenLit =
    raceState === "green" || raceState === "finished";

  const redLit = raceState === "red-light";

  function clearTimers() {
    timersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    timersRef.current = [];
  }

  function resetRace() {
    clearTimers();

    greenTimeRef.current = null;
    scheduledGreenTimeRef.current = null;

    setReactionTime(null);
    setAmberIndex(0);
    setRaceState("idle");
  }

  function startCountdown() {
    setRaceState("staged");

    const starterDelay = 1000 + Math.random() * 2000;

    scheduledGreenTimeRef.current =
      performance.now() + starterDelay + 1500;

    const startTimer = window.setTimeout(() => {
      setRaceState("countdown");
      setAmberIndex(1);

      const secondAmberTimer = window.setTimeout(() => {
        setAmberIndex(2);
      }, 500);

      const thirdAmberTimer = window.setTimeout(() => {
        setAmberIndex(3);
      }, 1000);

      const greenTimer = window.setTimeout(() => {
        greenTimeRef.current = performance.now();

        setAmberIndex(0);
        setRaceState("green");
      }, 1500);

      timersRef.current.push(
        secondAmberTimer,
        thirdAmberTimer,
        greenTimer,
      );
    }, starterDelay);

    timersRef.current.push(startTimer);
  }

  function handleStageButton() {
    if (raceState === "idle") {
      setRaceState("pre-staged");
      return;
    }

    if (raceState === "pre-staged") {
      startCountdown();
      return;
    }

    resetRace();
  }

  function handleLaunch() {
    const launchTime = performance.now();

    if (
      raceState === "staged" ||
      raceState === "countdown"
    ) {
      clearTimers();

      if (scheduledGreenTimeRef.current !== null) {
        const result =
          launchTime - scheduledGreenTimeRef.current;

        setReactionTime(result);
      }

      setAmberIndex(0);
      setRaceState("red-light");
      return;
    }

    if (
      raceState === "green" &&
      greenTimeRef.current !== null
    ) {
      const result =
        launchTime - greenTimeRef.current;

      setReactionTime(result);
      setRaceState("finished");
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code !== "Space" || event.repeat) {
        return;
      }

      event.preventDefault();
      handleLaunch();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [raceState]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  function getButtonLabel() {
    if (raceState === "idle") {
      return "Pre-Stage";
    }

    if (raceState === "pre-staged") {
      return "Stage";
    }

    return "Reset";
  }

  function getStatusMessage() {
    if (raceState === "idle") {
      return "Click Pre-Stage to begin.";
    }

    if (raceState === "pre-staged") {
      return "Move into the stage beam.";
    }

    if (raceState === "staged") {
      return "Hold steady...";
    }

    if (raceState === "countdown") {
      return "Get ready!";
    }

    if (raceState === "green") {
      return "GO!";
    }

    if (
      raceState === "red-light" &&
      reactionTime !== null
    ) {
      return `RED LIGHT: ${(reactionTime / 1000).toFixed(3)}`;
    }

    if (
      raceState === "finished" &&
      reactionTime !== null
    ) {
      return `Reaction time: ${(reactionTime / 1000).toFixed(3)} seconds`;
    }

    return "";
  }

  return (
    <main className="app">
      <h1>Drag Tree Simulator</h1>

      <Tree
        preStageLit={preStageLit}
        stageLit={stageLit}
        amberIndex={amberIndex}
        greenLit={greenLit}
        redLit={redLit}
      />

      <section className="race-controls">
        <p
          className={`race-status ${
            raceState === "red-light" ? "red-text" : ""
          }`}
        >
          {getStatusMessage()}
        </p>

        <p className="launch-instruction">
          Press the spacebar to launch.
        </p>

        <button
          type="button"
          onClick={handleStageButton}
        >
          {getButtonLabel()}
        </button>
      </section>
    </main>
  );
}

export default App;