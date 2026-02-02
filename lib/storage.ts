import { WeeklyPlan } from "./types";

const PLAN_KEY = "food_autopilot_plan";

export function savePlan(plan: WeeklyPlan) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function loadPlan(): WeeklyPlan | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(PLAN_KEY);
  return raw ? (JSON.parse(raw) as WeeklyPlan) : null;
}
