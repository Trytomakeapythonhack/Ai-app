import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MealCard from "../components/MealCard";
import Section from "../components/Section";
import StatCard from "../components/StatCard";
import { WeeklyPlan } from "../lib/types";
import { loadPlan, savePlan } from "../lib/storage";

export default function WeeklyPlanPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);

  useEffect(() => {
    const saved = loadPlan();
    if (saved) {
      setPlan(saved);
      return;
    }

    fetch("/api/generate-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budgetSek: 5000, notes: "Demo plan" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.plan) {
          savePlan(data.plan);
          setPlan(data.plan as WeeklyPlan);
        }
      });
  }, []);

  if (!plan) {
    return (
      <Layout title="Weekly plan" subtitle="Loading your AI plan...">
        <div className="app-card p-6">Generating plan...</div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Weekly plan"
      subtitle="Your 7-day AI plan with macros, recipes, and sketch prompts."
    >
      <div className="space-y-10">
        <Section title="Plan overview">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="Weekly budget" value={`${plan.budgetSek} SEK`} />
            <StatCard
              label="Macro target"
              value={`${plan.macroTarget.protein}g protein`}
              helper={`${plan.macroTarget.kcal} kcal/day`}
            />
            <StatCard label="Meals planned" value={`${plan.days.length * 4} meals`} />
          </div>
        </Section>

        {plan.days.map((day) => (
          <Section key={day.day} title={day.day} description="Macros + recipes">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="app-card p-4">
                <p className="text-sm text-slate-500">Daily macros</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
                  <span>🔥 {day.dailyMacros.kcal} kcal</span>
                  <span>🥩 {day.dailyMacros.protein}g protein</span>
                  <span>🥦 {day.dailyMacros.carbs}g carbs</span>
                  <span>🥑 {day.dailyMacros.fat}g fat</span>
                </div>
              </div>
              <div className="app-card p-4">
                <p className="text-sm text-slate-500">Meals</p>
                <p className="mt-2 text-sm text-slate-700">
                  {day.meals.map((meal) => meal.recipe.name).join(" • ")}
                </p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {day.meals.map((slot) => (
                <MealCard key={`${day.day}-${slot.meal}`} slot={slot} />
              ))}
            </div>
          </Section>
        ))}
      </div>
    </Layout>
  );
}
