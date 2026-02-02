export type Household = {
  adults: number;
  teens: number;
  children: number;
};

export type Preferences = {
  household: Household;
  activityLevel: "low" | "medium" | "high";
  budgetSek: number;
  diet: string[];
  dislikes: string[];
  allergies: string[];
  mealsPerDay: number;
  notes: string;
};

export type MacroBreakdown = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  imagePrompt: string;
  servings: number;
  ingredients: { name: string; grams: number }[];
  steps: string[];
  macros: MacroBreakdown;
};

export type MealSlot = {
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
};

export type DayPlan = {
  day: string;
  meals: MealSlot[];
  dailyMacros: MacroBreakdown;
};

export type WeeklyPlan = {
  id: string;
  summary: string;
  budgetSek: number;
  macroTarget: MacroBreakdown;
  days: DayPlan[];
};

export type CatalogItem = {
  sku: string;
  name: string;
  pack_g: number;
  price_sek: number;
  macros_per_100g: MacroBreakdown;
};

export type CartLine = {
  sku: string;
  name: string;
  packs: number;
  grams: number;
  price_sek: number;
};

export type CartSummary = {
  store: string;
  lines: CartLine[];
  total_sek: number;
  budgetSek: number;
  warnings: string[];
  substitutions: { ingredient: string; suggestion: string }[];
};
