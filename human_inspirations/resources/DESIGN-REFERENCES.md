# Design reference notes — 25 November 2026

## Inspora
Source: https://www.inspora.design/ (fetched 21:37 Singapore)
The extracted page is a curated archive of recent visual design inspiration and creative work. Navigation: Design / Websites / Logos; category filters All, Web, Branding, Product, Motion, Illustration, 3D, Print; Latest / Featured ordering. Content-first editorial archive structure. Examples on the current page include one-tap-menu-bypass, audio-reactive-voice-visualizer, branching, cinematic-film-import. Text extraction does NOT prove exact font, spacing, visual layout or motion. No browser inspection has occurred; local headless Chrome is prohibited for memory reasons.

## Apple design skill
Local source: `_reference/apple-design-skill/SKILL.md`; principles in `references/hig/design-principles.md`, sourced from https://developer.apple.com/design/human-interface-guidelines/design-principles.
Eight principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Most relevant: stay out of the way and get people to the actual content; give freedom to explore; transparent claims; every element earns its place; delight is not decoration. Desktop-oriented web app: apply foundations, not pretend this is a native macOS application. Skill requires reading accessibility/layout/typography/color/macOS/cross-platform and relevant components before citing them.

## Emil Kowalski skills
Local sources: `_reference/skills/skills/emil-design-eng/SKILL.md`, `animate/SKILL.md`, `choreograph/SKILL.md`.
Use CSS transform/opacity, precise properties (no transition:all), --ease-out cubic-bezier(0.23,1,0.32,1), --ease-in-out cubic-bezier(0.77,0,0.175,1). Press feedback 100–160ms; occasional transitions under 300ms; no animated keyboard actions; no repeated entrance/stagger on high-frequency controls. One entrance per container, content already there. No uniform stagger; no delay without meaning. Reduced motion and hover pointer gating ship together. Motion must have named purpose, not fill empty space. Use no extra library for simple fades.

## Honest v1 assessment
None of these three requested references was used for v1. Repeated rounded cards, equal visual weight, technical text before demos, blue buttons and tiny charts made the design generic. V2 should be an ordered project index plus focused preview/logic, with each project’s own identity and concise operational facts. Prototype links are primary; backend and verification are secondary. Preserve implemented vs tested-as-reported vs proposed distinctions.

---
## Added 25 Nov 2026, 22:26 — later references

### Inspora /websites (fetched 21:48, text only) — https://www.inspora.design/websites
Filters with counts: Category (Agency, AI, Design, Software, Technology, Productivity ...), Theme (3D, Animated, Dark, Minimal, Typography, Interactive, Grid ...), Colour (Black 49, White 48, Blue 24, Green 23, Gray 22 ...). Latest/Featured toggle. Each entry is a name plus one line. Listed sites include Wispr Flow, Superlist, Anime.js, Unkey, Greptile, Grids, CANALS, Supaste, Butter, Clay. Coordinator note (not checked by me): Inspora chrome uses #FCFCFD, #D7D7D7, #262727, #B6B6B5, #696968; the work carries the colour.

### Wispr Flow (fetched 21:48, text only) — https://wisprflow.ai/
Headline "Don't type, _just speak._" with an italic second half; section headings repeat the pattern. Large statement type, one idea per section.

### 60fps.design (fetched 21:48, text only) — https://www.60fps.design/
Numbered entries (2150 shots), many filters (gestures, patterns, effects, elements), sparse chrome.

### unfold (fetched 22:19) — https://github.com/Dksie09/unfold
Next.js + React Three Fiber pop-up journal. No image assets; every drawing generated in code. `lib/sketch.ts` = "a small hand-drawn 2D renderer (wobbly ink lines, watercolour fills, hatching, paper cut-outs)"; `bake()` turns drawings into textures. Surfaces start as ink line art and wash with colour as a room comes to the front. Font: Caveat (@fontsource/caveat). Paper shader: grain, colour reveal, soft light, pen hatching. The hub re-implements the idea in plain SVG (public/sketch.js, public/illustrations.js); I read only the README, not its code.

### Q7 "Architecture Relive" = design benchmark (Wilson, 22:21) — local analysis/p7-idea/
Read 22:22: DESIGN-RATIONALE.md section 12, app/public/css/style.css, index.html, js/plates.js. Tokens: stone #EDE6D6, stone-2 #E2D9C4, ink #1B1612, ink-2 #5A4F44, ruby #9B2D30, amber #C98F2B, moss #4B6B55, night #15110E. SF system stack for body; serif (ui-serif, "New York") display headlines, weight 500, tracking -.035em, up to 168px; Caveat 500/700 vendored. Ease cubic-bezier(.23,1,.32,1). Pill buttons, large (up to 28px text, padding .8em 1.4em), 160 ms, :active scale(.97), hover only under (hover:hover) and (pointer:fine). Landing = huge headline + one sub line + one CTA. Plates = line SVG drawn on with stroke-dashoffset, colours ink/ruby/amber/moss. Its own rationale says contrast and rendering were not verified in a rendered page.

## 23:15 humans& anchor video (Wilson's rule: anchor reference for design feeling and transitions)
Source: AI-round/_inspo/huamns&-demo-inspo.MP4 (21.6 s, 848x848, no audio). I looked at 24 frames at 0.9 s spacing (ffmpeg contact sheet, viewed as one image); I did not watch it in motion, so timings below are inferred from frame spacing, not measured.
- Frames 1-6: a warm, painterly classroom (ochre wood, green chalkboard, orange fruit) with a pale sage ampersand character wearing round glasses. The scene resolves from a rough, textured, half-painted state to a settled one; the chalkboard drawings (graphs) appear stroke by stroke.
- Frames 7-14: a dark charcoal chart panel ("TutorMoments performance") with tabs. Horizontal bars grow in, staggered top to bottom. One series is a warm terracotta accent; the others are muted sage-grey, so the focus bar stays bright and the rest step back.
- Frames 15-17: bars and labels fade out quietly (exit is a dim and fade, not a slide).
- Frames 18-24: a line chart ("Better learners train better tutors"): two thin cream lines draw on left to right, end labels (0.659, 0.477) appear after the lines, then everything dims and fades.
