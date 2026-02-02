import { demoWeeklyPlan } from "../lib/demoData";
import { DayPlan, Preferences, WeeklyPlan } from "../lib/types";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function cloneDay(day: DayPlan, name: string): DayPlan {
  return {
    ...day,
    day: name,
    meals: day.meals.map((slot, index) => ({
      ...slot,
      recipe: {
        ...slot.recipe,
        id: `${slot.recipe.id}_${name.toLowerCase()}`,
        name: index === 2 && name !== "Monday" ? `${slot.recipe.name} (${name})` : slot.recipe.name,
      },
    })),
  };
}

export function generateWeeklyPlan(preferences?: Preferences): WeeklyPlan {
  const baseDay = demoWeeklyPlan.days[0];
  const days = dayNames.map((name) => cloneDay(baseDay, name));
  const budget = preferences?.budgetSek ?? demoWeeklyPlan.budgetSek;
  const summary = preferences?.notes
    ? `${demoWeeklyPlan.summary} Notes: ${preferences.notes}`
    : demoWeeklyPlan.summary;

  return {
    ...demoWeeklyPlan,
    summary,
    budgetSek: budget,
    days,
  };
}
