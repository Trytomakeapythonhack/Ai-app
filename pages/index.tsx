import Link from "next/link";
import Layout from "../components/Layout";
import Section from "../components/Section";

export default function Home() {
  return (
    <Layout
      title="Your AI meal planner & auto-cart"
      subtitle="From goal to weekly plan to store-ready cart in minutes."
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Section
          title="Plan like Mathem + ChatGPT + Macro coach"
          description="Describe your household and goals. Food Autopilot handles recipes, macros, and store-ready carts."
        >
          <div className="app-card space-y-5 p-6">
            <p className="text-lg text-slate-700">
              “Planera mat i 7 dagar. Budget 5000 kr. 2 vuxna, 1 ungdom. Fokus protein
              och grönsaker. Low-carb. Mycket frukt.”
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-oat-700 px-5 py-3 text-sm font-semibold text-white"
                href="/onboarding"
              >
                Start onboarding
              </Link>
              <Link
                className="rounded-full border border-oat-300 px-5 py-3 text-sm font-semibold text-oat-700"
                href="/weekly-plan"
              >
                View demo plan
              </Link>
            </div>
          </div>
        </Section>
        <Section title="What you get">
          <div className="space-y-4">
            {[
              "Weekly AI meal plan with recipes",
              "Macro totals per meal/day/week",
              "Auto-generated grocery list",
              "Real cart rounded to pack sizes",
              "Store catalogs + substitutions",
              "Sketch-style recipe imagery prompts",
            ].map((item) => (
              <div key={item} className="app-card px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
