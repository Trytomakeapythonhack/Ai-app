import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Section from "../components/Section";
import StatCard from "../components/StatCard";
import { Preferences } from "../lib/types";
import { savePlan } from "../lib/storage";

const defaultPreferences: Preferences = {
  household: { adults: 2, teens: 1, children: 0 },
  activityLevel: "medium",
  budgetSek: 5000,
  diet: ["low-carb", "high-protein"],
  dislikes: ["mushrooms"],
  allergies: [],
  mealsPerDay: 4,
  notes: "Fokus protein och grönsaker. Mycket frukt.",
};

export default function Onboarding() {
  const router = useRouter();
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    });
    const data = await response.json();
    if (data.plan) {
      savePlan(data.plan);
      router.push("/weekly-plan");
    }
    setLoading(false);
  }

  return (
    <Layout
      title="Onboarding"
      subtitle="Tell us about your household and goals, then we build your week."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Section title="Household + budget">
          <form onSubmit={handleSubmit} className="app-card space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {([
                ["adults", "Adults"],
                ["teens", "Teens"],
                ["children", "Children"],
              ] as const).map(([key, label]) => (
                <label key={key} className="space-y-1 text-sm text-slate-600">
                  {label}
                  <input
                    className="w-full rounded-xl border border-oat-200 px-3 py-2 text-slate-900"
                    type="number"
                    min={0}
                    value={preferences.household[key]}
                    onChange={(event) =>
                      setPreferences((prev) => ({
                        ...prev,
                        household: { ...prev.household, [key]: Number(event.target.value) },
                      }))
                    }
                  />
                </label>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-slate-600">
                Activity level
                <select
                  className="w-full rounded-xl border border-oat-200 px-3 py-2 text-slate-900"
                  value={preferences.activityLevel}
                  onChange={(event) =>
                    setPreferences((prev) => ({
                      ...prev,
                      activityLevel: event.target.value as Preferences["activityLevel"],
                    }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
              <label className="space-y-1 text-sm text-slate-600">
                Budget per week (SEK)
                <input
                  className="w-full rounded-xl border border-oat-200 px-3 py-2 text-slate-900"
                  type="number"
                  min={1000}
                  value={preferences.budgetSek}
                  onChange={(event) =>
                    setPreferences((prev) => ({
                      ...prev,
                      budgetSek: Number(event.target.value),
                    }))
                  }
                />
              </label>
            </div>
            <label className="space-y-1 text-sm text-slate-600">
              Meals per day
              <input
                className="w-full rounded-xl border border-oat-200 px-3 py-2 text-slate-900"
                type="number"
                min={2}
                max={4}
                value={preferences.mealsPerDay}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    mealsPerDay: Number(event.target.value),
                  }))
                }
              />
            </label>
            <label className="space-y-1 text-sm text-slate-600">
              Notes / prompt
              <textarea
                className="w-full rounded-xl border border-oat-200 px-3 py-2 text-slate-900"
                rows={4}
                value={preferences.notes}
                onChange={(event) =>
                  setPreferences((prev) => ({
                    ...prev,
                    notes: event.target.value,
                  }))
                }
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-oat-700 py-3 text-sm font-semibold text-white"
              disabled={loading}
            >
              {loading ? "Generating week..." : "Generate my week"}
            </button>
          </form>
        </Section>
        <Section title="What happens next">
          <div className="grid gap-4">
            <StatCard label="AI output" value="7-day plan" helper="Recipes + steps" />
            <StatCard label="Macro engine" value="Per day + week" helper="Protein & carbs" />
            <StatCard label="Cart builder" value="Store-ready" helper="Pack-size aware" />
            <StatCard label="Sketch prompts" value="Every meal" helper="Watercolor + pencil" />
          </div>
        </Section>
      </div>
    </Layout>
  );
}
