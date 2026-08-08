import { useEffect, useRef, useState } from "react";
import Tree from "./components/Tree";
import TreeModeSelect from "./components/Settings/treeMode";
import {
  treeModes,
  type TreeMode,
} from "./config/treeModes";

/*
 * Simulated mechanical delay between releasing the
 * transbrake and the car clearing the stage beam.
 */
const VEHICLE_RELEASE_DELAY_MS = 120;

type RaceState =
  | "idle"
  | "pre-staged"
  | "staged"
  | "countdown"
  | "green"
  | "finished"
  | "red-light";

function App() {
  const [raceState, setRaceState] =
    useState<RaceState>("idle");

  const [amberIndex, setAmberIndex] = useState(0);
  const [reactionTime, setReactionTime] =
    useState<number | null>(null);

  const [treeMode, setTreeMode] =
    useState<TreeMode>("pro");

  const greenTimeRef = useRef<number | null>(null);
  const scheduledGreenTimeRef =
    useRef<number | null>(null);

  const timersRef = useRef<number[]>([]);

  const mode = treeModes[treeMode];

  const preStageLit = raceState !== "idle";

  const stageLit =
    raceState === "staged" ||
    raceState === "countdown" ||
    raceState === "green" ||
    raceState === "finished" ||
    raceState === "red-light";

  const greenLit =
    raceState === "green" ||
    raceState === "finished";

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

  function turnGreen() {
    greenTimeRef.current = performance.now();

    setAmberIndex(0);
    setRaceState("green");
  }

  function startCountdown() {
    setRaceState("staged");

    const starterDelay =
      1000 + Math.random() * 2000;

    scheduledGreenTimeRef.current =
      performance.now() +
      starterDelay +
      mode.greenDelayMs;

    const startTimer = window.setTimeout(() => {
      /*
       * PRO TREE
       *
       * All three ambers illuminate together.
       */
      if (mode.amberStyle === "simultaneous") {
        setRaceState("countdown");
        setAmberIndex(3);

        const greenTimer = window.setTimeout(
          turnGreen,
          mode.greenDelayMs,
        );

        timersRef.current.push(greenTimer);
        return;
      }

      /*
       * SPORTSMAN TREE
       *
       * Ambers illuminate one at a time.
       */
      if (mode.amberStyle === "sequential") {
        setRaceState("countdown");
        setAmberIndex(1);

        const secondAmberTimer = window.setTimeout(
          () => {
            setAmberIndex(2);
          },
          mode.amberIntervalMs,
        );

        const thirdAmberTimer = window.setTimeout(
          () => {
            setAmberIndex(3);
          },
          mode.amberIntervalMs * 2,
        );

        const greenTimer = window.setTimeout(
          turnGreen,
          mode.greenDelayMs,
        );

        timersRef.current.push(
          secondAmberTimer,
          thirdAmberTimer,
          greenTimer,
        );

        return;
      }

      /*
       * INSTANT GREEN
       *
       * Starter delay finishes and green comes on.
       */
      turnGreen();
    }, starterDelay);

    timersRef.current.push(startTimer);
  }

  function handleLaunch() {
    const releaseTime = performance.now();
    const vehicleLeaveTime =
      releaseTime + VEHICLE_RELEASE_DELAY_MS;

    if (
      raceState === "staged" ||
      raceState === "countdown"
    ) {
      clearTimers();
      setAmberIndex(0);

      if (
        scheduledGreenTimeRef.current !== null
      ) {
        /*
         * Round to the nearest thousandth so a
         * displayed 0.000 counts as a perfect light.
         */
        const result = Math.round(
          vehicleLeaveTime -
            scheduledGreenTimeRef.current,
        );

        setReactionTime(result);

        if (result < 0) {
          setRaceState("red-light");
        } else {
          greenTimeRef.current =
            scheduledGreenTimeRef.current;
          setRaceState("finished");
        }

        return;
      }

      setRaceState("red-light");
      return;
    }

    if (
      raceState === "green" &&
      greenTimeRef.current !== null
    ) {
      const result = Math.round(
        vehicleLeaveTime - greenTimeRef.current,
      );

      setReactionTime(result);
      setRaceState("finished");
    }
  }

  /*
   * SPACEBAR CONTROLS
   *
   * First press:
   *   Pre-stage
   *
   * Second press:
   *   Stage and hold the transbrake
   *
   * Release:
   *   Launch
   */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.code !== "Space" ||
        event.repeat
      ) {
        return;
      }

      event.preventDefault();

      if (raceState === "idle") {
        setRaceState("pre-staged");
        return;
      }

      if (raceState === "pre-staged") {
        startCountdown();
      }
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.code !== "Space") {
        return;
      }

      event.preventDefault();

      /*
       * Releasing the first pre-stage press
       * shouldn't launch the car.
       */
      if (
        raceState === "staged" ||
        raceState === "countdown" ||
        raceState === "green"
      ) {
        handleLaunch();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.addEventListener(
      "keyup",
      handleKeyUp,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp,
      );
    };
  }, [raceState, mode]);

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

  function handleTreeModeChange(mode: TreeMode) {
    if (mode === treeMode) {
      return;
    }

    resetRace();
    setTreeMode(mode);
  }

  function getStatusMessage() {
    if (raceState === "idle") {
      return "Press Space to pre-stage.";
    }

    if (raceState === "pre-staged") {
      return "Press and hold Space to stage.";
    }

    if (raceState === "staged") {
      return "Hold the transbrake...";
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
      return `RED LIGHT: ${(
        reactionTime / 1000
      ).toFixed(3)}`;
    }

    if (
      raceState === "finished" &&
      reactionTime !== null
    ) {
      return `Reaction time: ${(
        reactionTime / 1000
      ).toFixed(3)} seconds`;
    }

    return "";
  }

  return (
    <main className="app">
      <TreeModeSelect
        value={treeMode}
        onChange={handleTreeModeChange}
        disabled={
          raceState === "staged" ||
          raceState === "countdown" ||
          raceState === "green"
        }
      />

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
            raceState === "red-light"
              ? "red-text"
              : ""
          }`}
        >
          {getStatusMessage()}
        </p>

        <p className="launch-instruction">
          Press Space to pre-stage. Press and
          hold Space to stage. Release to launch.
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