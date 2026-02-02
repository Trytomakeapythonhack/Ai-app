import type { NextApiRequest, NextApiResponse } from "next";
import { generateWeeklyPlan } from "../../api/planGenerator";
import { Preferences, WeeklyPlan } from "../../lib/types";

type ResponseData = {
  plan: WeeklyPlan;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | { error: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const preferences = req.body as Preferences | undefined;
  const plan = generateWeeklyPlan(preferences);
  res.status(200).json({ plan });
}
