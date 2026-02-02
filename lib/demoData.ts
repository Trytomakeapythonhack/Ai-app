import { WeeklyPlan } from "./types";

export const demoWeeklyPlan: WeeklyPlan = {
  id: "plan_demo_001",
  summary:
    "High-protein low-carb week with colorful vegetables, Swedish staples, and fruit-forward snacks.",
  budgetSek: 5000,
  macroTarget: {
    kcal: 2100,
    protein: 150,
    carbs: 140,
    fat: 80,
  },
  days: [
    {
      day: "Monday",
      meals: [
        {
          meal: "breakfast",
          recipe: {
            id: "rec_overnight",
            name: "Overnight Skyr Bowl",
            description: "Skyr with berries, chia, and toasted almonds.",
            imagePrompt:
              "Hand-drawn pencil illustration of skyr bowl with blueberries and almonds, soft watercolor wash, minimalist Scandinavian cookbook aesthetic",
            servings: 2,
            ingredients: [
              { name: "Skyr", grams: 300 },
              { name: "Blueberries", grams: 120 },
              { name: "Chia seeds", grams: 20 },
              { name: "Almonds", grams: 30 },
            ],
            steps: [
              "Layer skyr and berries in a glass jar.",
              "Sprinkle chia seeds and almonds on top.",
              "Chill overnight and serve with fresh fruit.",
            ],
            macros: { kcal: 410, protein: 32, carbs: 34, fat: 16 },
          },
        },
        {
          meal: "lunch",
          recipe: {
            id: "rec_chicken_salad",
            name: "Lemon Chicken Crunch Salad",
            description: "Grilled chicken, cabbage, cucumber, and citrus dressing.",
            imagePrompt:
              "Hand-drawn pencil illustration of lemon chicken salad with cucumber and herbs, soft watercolor wash, minimalist Scandinavian cookbook aesthetic",
            servings: 2,
            ingredients: [
              { name: "Chicken breast", grams: 320 },
              { name: "Green cabbage", grams: 200 },
              { name: "Cucumber", grams: 160 },
              { name: "Lemon", grams: 60 },
            ],
            steps: [
              "Grill chicken with salt and pepper.",
              "Slice cabbage and cucumber thinly.",
              "Toss everything with lemon juice and olive oil.",
            ],
            macros: { kcal: 520, protein: 45, carbs: 18, fat: 22 },
          },
        },
        {
          meal: "dinner",
          recipe: {
            id: "rec_salmon",
            name: "Nordic Salmon Tray",
            description: "Oven-baked salmon with broccoli and dill yogurt sauce.",
            imagePrompt:
              "Hand-drawn pencil illustration of baked salmon tray with broccoli and dill, soft watercolor wash, minimalist Scandinavian cookbook aesthetic",
            servings: 3,
            ingredients: [
              { name: "Salmon fillet", grams: 450 },
              { name: "Broccoli", grams: 300 },
              { name: "Greek yogurt", grams: 150 },
              { name: "Fresh dill", grams: 10 },
            ],
            steps: [
              "Roast salmon and broccoli at 200°C for 15 minutes.",
              "Mix yogurt with chopped dill and lemon zest.",
              "Serve salmon with broccoli and sauce.",
            ],
            macros: { kcal: 680, protein: 52, carbs: 20, fat: 38 },
          },
        },
        {
          meal: "snack",
          recipe: {
            id: "rec_fruit",
            name: "Apple & Peanut Protein",
            description: "Apple slices with peanut butter and cinnamon.",
            imagePrompt:
              "Hand-drawn pencil illustration of apple slices with peanut butter, soft watercolor wash, minimalist Scandinavian cookbook aesthetic",
            servings: 2,
            ingredients: [
              { name: "Apple", grams: 200 },
              { name: "Peanut butter", grams: 40 },
            ],
            steps: [
              "Slice apples thinly.",
              "Spread peanut butter and dust with cinnamon.",
            ],
            macros: { kcal: 320, protein: 12, carbs: 28, fat: 18 },
          },
        },
      ],
      dailyMacros: { kcal: 1930, protein: 141, carbs: 100, fat: 94 },
    },
  ],
};
