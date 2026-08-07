export type TreeMode = "pro" | "sportsman" | "instant";

export interface TreeModeConfig {
  id: TreeMode;
  name: string;
  description: string;
  amberStyle: "simultaneous" | "sequential" | "none";
  amberIntervalMs: number;
  greenDelayMs: number;
}

export const treeModes: Record<TreeMode, TreeModeConfig> = {
  pro: {
    id: "pro",
    name: "Pro Tree",
    description:
      "All three amber bulbs illuminate together, followed by green after 0.400 seconds.",
    amberStyle: "simultaneous",
    amberIntervalMs: 0,
    greenDelayMs: 400,
  },

  sportsman: {
    id: "sportsman",
    name: "Sportsman Tree",
    description:
      "Amber bulbs illuminate sequentially every 0.500 seconds before green.",
    amberStyle: "sequential",
    amberIntervalMs: 500,
    greenDelayMs: 1500,
  },

  instant: {
    id: "instant",
    name: "Instant Green",
    description:
      "No amber countdown. Green illuminates immediately after the starter delay.",
    amberStyle: "none",
    amberIntervalMs: 0,
    greenDelayMs: 0,
  },
};