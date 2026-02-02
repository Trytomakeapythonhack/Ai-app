import type { NextApiRequest, NextApiResponse } from "next";
import { buildCartSummary } from "../../api/cartBuilder";
import { Recipe } from "../../lib/types";

type RequestBody = {
  store: string;
  recipes: Recipe[];
  budgetSek: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { store, recipes, budgetSek } = req.body as RequestBody;
  if (!store || !recipes) {
    res.status(400).json({ error: "Missing store or recipes" });
    return;
  }

  const summary = buildCartSummary(recipes, store, budgetSek ?? 5000);
  res.status(200).json({ summary });
}
