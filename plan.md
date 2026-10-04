# Imthiyas Portfolio — Implementation & Design Plan

## Product direction
A one-page portfolio for Imthiyas S that positions him as a UI/UX Designer who can carry ideas through front-end implementation. The experience should feel authored, editorial, and quietly confident: strong enough for a hiring manager or client to remember, clear enough to scan quickly.

## Design system

- **Design Movement:** Editorial brutalism softened with Swiss product-design discipline: oversized type, visible grid logic, confident whitespace, and precise micro-interactions.
- **Core Principles:** (1) Lead with point of view, not a résumé dump. (2) Make project context scannable. (3) Use motion to establish rhythm, never to decorate. (4) Keep every interaction useful and accessible.
- **Color Philosophy:** A near-black graphite canvas creates a gallery-like stage. Warm off-white text keeps long reading comfortable. A single electric acid-lime signal color acts as the ownable brand cue for links, focus states, and key moments. Muted slate surfaces separate content without adding visual noise.
- **Layout Paradigm:** Asymmetric editorial flow: sticky index rail on desktop, full-width hero statement, alternating project feature rows, then a split process/experience narrative. The layout should feel like a printed design annual with responsive behavior rather than a centered SaaS template.
- **Signature Elements:** (1) Lime “signal” strokes and index numbers. (2) A floating orbit/scanline visual in the hero. (3) Project cards that combine a typographic cover with a small “view case study” cue instead of stock imagery.
- **Interaction Philosophy:** The page responds with low-friction feedback: nav highlights the current section, cards lift subtly on hover, outbound links announce themselves, and the cursor never becomes a gimmick. All motion has a reduced-motion fallback.
- **Animation:** Hero elements enter in a staggered rise; section labels reveal on intersection; project cards use a 3–5px translate and border-color change; the hero orbit drifts slowly; a slim scroll progress bar tracks reading position. Prefer transform/opacity, avoid layout thrash, and disable nonessential animation under `prefers-reduced-motion`.
- **Typography System:** `Space Grotesk` for display and UI text; `DM Mono` for metadata, indices, and eyebrow labels. Display scale uses clamp; body copy stays compact and highly legible.
- **Brand Essence:** A product-minded designer for teams who want digital experiences to feel clear, considered, and buildable. Personality: **observant, exacting, warm**.
- **Brand Voice:** Direct, specific, and human. Example lines: “I turn messy product questions into calm, usable interfaces.” / “Good design should make the next decision feel obvious.”
- **Wordmark & Logo:** A compact `IS/` monogram built from a split vertical stroke and forward slash; it doubles as a section marker and favicon-like signature.
- **Signature Brand Color:** Acid lime `#D8FF5F`.

## Content architecture

1. **Hero:** Name, positioning, design philosophy, primary contact action, CV download, profile links, and compact availability signal.
2. **Selected work:** 10 verified Behance destinations grouped into Product systems, Interfaces, and Mobile moments. No invented outcomes or metrics.
3. **Tools:** Figma, Miro, Adobe XD, Sketch, Framer, Webflow, and Illustrator presented as linked, role-specific tool cards.
4. **About / process:** Chennai base, 9 years total experience, human-centered five-step process.
5. **Experience:** Inspirepro Product Technology AB (10/2021–Present) and Fliptech Solutions (04/2017–09/2021).
6. **Capability stack:** Research, structure, interface craft, front-end bridge, tools.
7. **AI x design:** Human-centered, credible framing of AI as a synthesis and exploration partner, not a substitute for validation.
8. **Education:** BE – Computer Science & Engineering, M.I.E.T. Engineering College.
9. **Contact:** email, phone, Behance, LinkedIn, GitHub, CV.

## Project structure

- `index.html` — semantic single-page content and navigation landmarks.
- `styles.css` — tokens, responsive layout, surfaces, type scale, and motion.
- `script.js` — intersection reveals, scroll progress, active nav state, and current-year text.
- `server.js` — minimal dependency-free static server on port 3000.
- `public/Imthiyas-S-CV.pdf` — user-supplied résumé download.
- `public/manus-routes.json` — route manifest for the one-page route.
- `app.config.ts` — stable platform logo metadata.

## Constraints & material choices

- Use only verified profile/CV content and the named Behance project titles.
- Keep the site static: no server, database, login, or fabricated case-study metrics.
- Use system-hosted Google Fonts via CSS `@import` for the selected type system; the layout remains usable if the import is unavailable.
- External Behance, LinkedIn, GitHub, mail, phone, and CV links open/behave accessibly.
- Ensure `manus-routes.json` is served as a real static JSON file, not SPA fallback HTML.
