import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import StatCard from "../components/StatCard";
import { CartSummary, WeeklyPlan } from "../lib/types";
import { loadPlan } from "../lib/storage";

const stores = ["mathem", "ica", "willys"];

export default function CartPage() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [store, setStore] = useState("mathem");

  useEffect(() => {
    setPlan(loadPlan());
  }, []);

  useEffect(() => {
    if (!plan) return;

    const recipes = plan.days.flatMap((day) => day.meals.map((meal) => meal.recipe));
    fetch("/api/build-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ store, recipes, budgetSek: plan.budgetSek }),
    })
      .then((response) => response.json())
      .then((data) => setCart(data.summary));
  }, [plan, store]);

  return (
    <Layout
      title="Auto cart"
      subtitle="Pack-size aware cart built from your weekly plan."
    >
      <div className="space-y-8">
        <Section title="Store selection" description="Choose where to build your cart.">
          <div className="flex flex-wrap gap-3">
            {stores.map((option) => (
              <button
                key={option}
                onClick={() => setStore(option)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  store === option
                    ? "border-oat-700 bg-oat-700 text-white"
                    : "border-oat-200 text-slate-700"
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Cart summary">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Total"
              value={cart ? `${cart.total_sek} SEK` : "--"}
              helper="Estimated at pack sizes"
            />
            <StatCard label="Budget" value={plan ? `${plan.budgetSek} SEK` : "--"} />
            <StatCard label="Store" value={store.toUpperCase()} />
          </div>
        </Section>

        <Section title="Cart lines">
          <div className="app-card divide-y divide-oat-100">
            {cart?.lines.map((line) => (
              <div key={line.sku} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{line.name}</p>
                  <p className="text-xs text-slate-500">
                    {line.packs} pack(s) • {line.grams}g
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-700">{line.price_sek} SEK</p>
              </div>
            ))}
            {!cart?.lines.length && (
              <div className="px-4 py-3 text-sm text-slate-600">
                Build a plan first to see cart lines.
              </div>
            )}
          </div>
        </Section>

        {cart?.warnings.length ? (
          <Section title="Budget warnings">
            <div className="app-card space-y-2 p-4 text-sm text-amber-700">
              {cart.warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          </Section>
        ) : null}

        {cart?.substitutions.length ? (
          <Section title="Substitution suggestions">
            <div className="app-card space-y-2 p-4 text-sm text-slate-600">
              {cart.substitutions.map((item) => (
                <p key={item.ingredient}>
                  {item.ingredient}: {item.suggestion}
                </p>
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </Layout>
  );
}
