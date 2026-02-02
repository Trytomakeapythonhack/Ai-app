import { loadCatalog } from "../lib/catalog";
import { CartLine, CartSummary, Recipe } from "../lib/types";

type IngredientNeed = {
  name: string;
  grams: number;
};

const ingredientMap: Record<string, string> = {
  "chicken": "chicken_1kg",
  "kyckling": "chicken_1kg",
  "salmon": "salmon_500g",
  "lax": "salmon_500g",
  "skyr": "skyr_500g",
  "broccoli": "broccoli_400g",
  "blueberries": "berries_300g",
  "blåbär": "berries_300g",
  "yogurt": "yogurt_1kg",
  "yoghurt": "yogurt_1kg",
  "avocado": "avocado_2pk",
  "eggs": "eggs_12pk",
  "nötfärs": "mince_1kg",
};

function normalize(name: string): string {
  return name.toLowerCase();
}

function matchSku(ingredient: string): string | undefined {
  const key = normalize(ingredient);
  const direct = Object.entries(ingredientMap).find(([token]) => key.includes(token));
  return direct?.[1];
}

function aggregateIngredients(recipes: Recipe[]): IngredientNeed[] {
  const totals = new Map<string, number>();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const key = ingredient.name;
      totals.set(key, (totals.get(key) ?? 0) + ingredient.grams);
    });
  });
  return Array.from(totals.entries()).map(([name, grams]) => ({ name, grams }));
}

export function buildCartSummary(
  recipes: Recipe[],
  store: string,
  budgetSek: number
): CartSummary {
  const catalog = loadCatalog(store);
  const totals = aggregateIngredients(recipes);
  const lines: CartLine[] = [];
  const warnings: string[] = [];
  const substitutions: { ingredient: string; suggestion: string }[] = [];

  totals.forEach((ingredient) => {
    const sku = matchSku(ingredient.name);
    const item = catalog.find((entry) => entry.sku === sku);
    if (!item) {
      substitutions.push({
        ingredient: ingredient.name,
        suggestion: "Add fresh produce or select from another store catalog.",
      });
      return;
    }
    const packs = Math.ceil(ingredient.grams / item.pack_g);
    const price = packs * item.price_sek;
    lines.push({
      sku: item.sku,
      name: item.name,
      packs,
      grams: packs * item.pack_g,
      price_sek: price,
    });
  });

  const total = lines.reduce((sum, line) => sum + line.price_sek, 0);
  if (total > budgetSek) {
    warnings.push("Cart is above weekly budget. Consider swapping premium proteins.");
  }

  return {
    store,
    lines,
    total_sek: total,
    budgetSek,
    warnings,
    substitutions,
  };
}
