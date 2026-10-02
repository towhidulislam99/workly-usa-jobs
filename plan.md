# Workly implementation plan

## Product scope
Workly is an original, polished USA-focused job marketplace inspired by the reference site's proven information architecture: search-first homepage, hiring-now and recent jobs, browsing by roles/industries/cities/employers, job detail, employer pathway, and trust/safety guidance. It must feel credible and useful without copying Snagajob branding or visual identity.

## Design direction
- **Design movement:** Editorial fintech-inspired utility design with warm human details: confident, clean, data-literate, and approachable.
- **Core principles:** (1) job search is the primary action, (2) trust is made visible through verification and transparent details, (3) progressive disclosure keeps dense information easy to scan, (4) every interaction should feel calm and purposeful.
- **Color philosophy:** Deep ink/navy provides stability and legibility; Workly's signature electric teal creates recognizable energy and highlights action; warm cream and pale mint surfaces make the experience human rather than clinical; coral is reserved for high-salience urgency badges.
- **Layout paradigm:** A left-aligned editorial canvas with an oversized search rail, offset card clusters, and a slim vertical signal rail. Avoid a generic centered grid by using asymmetrical hero composition and full-bleed section bands.
- **Signature elements:** the Workly “W” signal mark (two joined chevrons), a teal verification pill used sparingly, and a thin “signal line” motif that connects headings to content.
- **Interaction philosophy:** predictable controls, visible focus rings, helpful empty states, low-friction save actions, and filters that update the results count immediately. Buttons use subtle lift/press feedback rather than flashy motion.
- **Animation:** 180–240ms ease-out transitions for hover/focus; hero signal line drifts once on load; cards lift 2px on hover; no looping motion that distracts from job content; respect prefers-reduced-motion.
- **Typography:** Plus Jakarta Sans for all UI and headings, with a compact weight scale (700/800 headings, 600 labels, 400 body). Numbers and pay ranges use tabular-looking bold display sizing.
- **Brand essence:** “Find work that fits your life—and employers you can trust.” Personality: grounded, optimistic, clear.
- **Brand voice:** plainspoken, supportive, specific. Example lines: “Your next good fit is closer than you think.” / “Clear pay. Real employers. No guesswork.”
- **Wordmark & logo:** lowercase `workly` with a custom W signal formed from two angled strokes inside a rounded square, paired with a small teal dot to suggest a live opportunity.
- **Signature brand color:** Workly Teal `#0F9F8A`.

## Implementation
- Use a dependency-light React + Vite app, with semantic HTML, CSS variables, and inline SVG icons so the site is portable and fast.
- Single-page app with client-side view switching for `/`, `/jobs`, and `/jobs/:id` via `history.pushState`; include all routes in `public/manus-routes.json`.
- Seed realistic USA jobs in a local data module. Search, category chips, save buttons, filter controls, and apply actions are functional client-side interactions.
- No external image assets are required: the hero uses a CSS signal illustration and the job cards use accessible employer monograms, keeping the interface quick and brand-owned.
- Keep the page static and responsive at mobile, tablet, and desktop breakpoints; no server/database is needed for this prototype.

## Project structure
- `index.html`: document shell and metadata.
- `src/main.jsx`: app entry, route-aware rendering, seeded content, interactions.
- `src/styles.css`: design tokens, responsive layout, focus states, animations, component styling.
- `public/manus-routes.json`: complete route manifest for the preview/deployment system.
- `app.config.ts`: project logo metadata.
- `package.json` / `vite.config.js`: reproducible build and dev scripts.
