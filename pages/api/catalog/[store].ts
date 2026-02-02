import type { NextApiRequest, NextApiResponse } from "next";
import { listStores, loadCatalog } from "../../../lib/catalog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { store } = req.query;
  if (typeof store !== "string") {
    res.status(400).json({ error: "Store is required" });
    return;
  }

  const available = listStores();
  if (!available.includes(store.toLowerCase())) {
    res.status(404).json({ error: "Store not found", available });
    return;
  }

  const catalog = loadCatalog(store);
  res.status(200).json({ store, catalog });
}
