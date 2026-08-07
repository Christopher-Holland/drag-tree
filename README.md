# Drag Tree Simulator

A browser-based NHRA Christmas Tree reaction-time trainer. Stage in, hold the transbrake, and launch on green — then see whether you left early, hit a perfect light, or were late.

Built with React, TypeScript, and Vite.

## Features

- Visual Christmas Tree with pre-stage, stage, amber, green, and red bulbs
- Three tree modes aligned with National Hot Rod Association (NHRA) timing:
  - **Pro Tree** — all three ambers flash together, green after **0.400s**
  - **Sportsman Tree** — ambers flash one at a time every **0.500s**, green after the last amber
  - **Instant Green** — no amber countdown; green after the starter delay
- Reaction time measured to the thousandth of a second
- Red-light fouls for early launches; **0.000** counts as a perfect green light
- Spacebar controls plus on-screen stage/reset button

## Controls

| Action | Input |
| --- | --- |
| Pre-stage | Press `Space` (or click **Pre-Stage**) |
| Stage / hold transbrake | Press and hold `Space` (or click **Stage**) |
| Launch | Release `Space` |
| Reset | Click **Reset** after a run |

Use the tree mode panel on the left to switch between Pro, Sportsman, and Instant Green.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build    # Typecheck and production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Project structure

```
src/
  App.tsx                     # Race state machine and launch timing
  components/
    Tree/                     # Christmas Tree assembly
    Bulb/                     # Individual bulb
    Settings/treeMode.tsx     # Tree mode selector
  config/treeModes.ts         # Mode timing configuration
  index.css                   # Styles
```

## Timing notes

Reaction time is measured from the scheduled green to your launch:

- **Negative** — left early → red light
- **0.000** — perfect light → green
- **Positive** — left after green → reaction time shown in seconds

Pro Tree timing follows NHRA: simultaneous ambers, then green four-tenths of a second later.
