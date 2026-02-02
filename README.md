# Food Autopilot

AI meal planning + grocery cart builder connected to stores.

## What this MVP delivers
- Onboarding flow for household, budget, and dietary goals.
- Weekly AI meal plan with recipes, steps, macros, and sketch-style image prompts.
- Grocery list aggregation into store-ready carts with pack-size rounding.
- Store catalog APIs with substitution suggestions.

## Tech stack
- **Frontend:** Next.js + React + Tailwind CSS
- **Backend:** Next.js API routes (Node.js)
- **Database:** SQLite via Prisma schema
- **AI providers:** OpenAI GPT-4o + image model placeholders

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Quick visual preview (no build required)
If you only want to see the UI styling without installing dependencies, open
`public/preview.html` directly in a browser. If you serve the repo via a static
server, the URL is typically `http://localhost:8000/preview.html` (note: **not**
`/public/preview.html`). This is a static snapshot that mirrors the MVP landing +
weekly plan preview layout.

### Environment variables
Copy `.env.example` to `.env.local` and fill in values as needed.

### Prisma
The schema lives in `prisma/schema.prisma`. Use your preferred Prisma workflow if you want
persistence. The MVP uses static demo data.

## API routes
- `POST /api/generate-week` – returns a generated 7-day plan.
- `POST /api/build-cart` – builds a pack-size-aware cart from recipes.
- `GET /api/catalog/:store` – returns the catalog for `mathem`, `ica`, or `willys`.

## Demo store catalogs
Sample catalogs live in the `database/` folder and can be extended with real SKU mappings.

## UX flow
1. **Onboarding** → capture household, budget, and diet goals.
2. **Weekly plan** → view day-by-day meals, macros, and sketch prompts.
3. **Auto cart** → choose store and see cart totals with warnings/substitutions.

## Notes
- Replace the demo generator in `api/planGenerator.ts` with OpenAI API calls.
- Replace the cart mapping logic in `api/cartBuilder.ts` with real product search.
