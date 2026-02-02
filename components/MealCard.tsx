import { MealSlot } from "../lib/types";

type MealCardProps = {
  slot: MealSlot;
};

export default function MealCard({ slot }: MealCardProps) {
  const { meal, recipe } = slot;
  return (
    <div className="app-card space-y-3 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.2em] text-oat-600">{meal}</p>
        <span className="text-xs text-slate-500">{recipe.servings} servings</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{recipe.name}</h3>
      <p className="text-sm text-slate-600">{recipe.description}</p>
      <div className="rounded-xl border border-dashed border-oat-200 bg-oat-50 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-oat-700">
          Sketch prompt
        </p>
        <p className="text-sm text-slate-700">{recipe.imagePrompt}</p>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-slate-600">
        <span>🔥 {recipe.macros.kcal} kcal</span>
        <span>🥩 {recipe.macros.protein}g protein</span>
        <span>🥦 {recipe.macros.carbs}g carbs</span>
        <span>🥑 {recipe.macros.fat}g fat</span>
      </div>
    </div>
  );
}
