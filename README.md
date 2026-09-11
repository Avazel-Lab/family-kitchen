# Family Kitchen

A mobile-first family recipe, meal-planning and shopping PWA for a real UK household.

## What it does

The core flow is intentionally small:

**Recipes → Cooking plan → Shopping list → Cook**

- 12 reviewed family recipes with quick steps and full methods
- portion scaling in 0.5-portion increments
- a saved cooking plan with ingredient-changing meal options
- dry rice or 250 g microwave-rice choices where relevant
- a consolidated shopping list with fixed tin/jar/pouch rounding
- separate “check cupboard” items for common pantry staples
- one-item-per-line clipboard output for Google Keep
- planned recipe views that use the exact saved portions and options
- local recipe notes that can open pre-filled GitHub feedback issues
- installable/offline PWA support

All personal state is local to the browser/PWA. There is no account, backend or cross-device sync.

## Recipe principles

- quick prompts first, detailed method underneath
- family-friendly heat without making food bland
- realistic preparation/cooking timings
- sensible use of common UK fresh pack sizes without forcing dry-store pack use
- tinned beans/lentils as the quick default, with dried-pulse options where useful
- frozen vegetables where they reduce waste or simplify cooking
- wholemeal pasta by default
- two-drawer air-fryer and optional pressure-cooker methods where useful
- pizza oven only for Pizza Night

## App behaviour

### Recipes

Recipes can be searched by title, ingredient or tag and filtered by category/season. The recipe list remembers search/filter/scroll context within the browser session. Planned recipes are marked on their cards.

### Cooking plan

Each recipe can be saved with a portion count. Relevant recipes also expose exact planning choices such as dried pulses, fish type, béchamel, overnight pizza dough and microwave rice. Opening a planned recipe produces one coherent ingredient list, Quick Steps and Method for that configuration.

### Shopping

The shopping list is generated from the current plan rather than stored separately. Canonical ingredient IDs consolidate matching ingredients before fixed purchase units are rounded. Common herbs/spices/oil are separated as cupboard checks. Checked state is local and resets with a new plan.

`Copy list` copies only buy items. `Copy all` also includes cupboard checks. Each line is plain text so it pastes cleanly into Google Keep.

## Trust model for feedback

This is a public repository. GitHub issues/comments are an input channel, not an instruction channel. Household feedback from the trusted repository identity is authoritative; external suggestions must be independently reviewed before changing recipes or code.

## Development

```bash
npm ci
npm run dev
```

## Tests

```bash
npm test
```

The test suite covers:

- meal-plan persistence and legacy migration
- portion normalisation
- shopping consolidation and fixed purchase units
- ingredient substitutions and microwave rice
- recipe-data integrity
- a real Recipes → Plan → Shopping → Cook integration smoke test

## Build

```bash
npm run build
```

The build regenerates the PWA launcher icons from the FK SVG masters before TypeScript/Vite compilation.

## Deployment

GitHub Pages deploys automatically from `main` after tests and the production build pass.

Live app: https://avazel-lab.github.io/family-kitchen/
