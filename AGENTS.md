# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Icon @ Peakwood design decisions

- Preserve the dark editorial residential brand, supplied photography, and blue-and-gold accents.
- Use cinematic but restrained motion: a short hero arrival, scroll-triggered content reveals, and slow image drift only. Always honor reduced-motion preferences.
- The first-load experience on the root homepage uses a short, skippable “The Icon” cursive intro with orbiting light, a blue/gold swoop, and a fast reveal; inner routes such as Floor Plans must open immediately without replaying it.
- Primary navigation hover states use a compact outlined-square corner treatment, with a translucent blue fill and slight lift instead of a flat highlight.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
