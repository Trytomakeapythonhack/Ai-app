import fs from "fs";
import path from "path";
import { CatalogItem } from "./types";

const catalogMap: Record<string, string> = {
  mathem: "catalog-mathem.json",
  ica: "catalog-ica.json",
  willys: "catalog-willys.json",
};

export function loadCatalog(store: string): CatalogItem[] {
  const fileName = catalogMap[store.toLowerCase()];
  if (!fileName) {
    return [];
  }
  const filePath = path.join(process.cwd(), "database", fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as CatalogItem[];
}

export function listStores(): string[] {
  return Object.keys(catalogMap);
}
