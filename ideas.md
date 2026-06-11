# Mothership Project Overview — Design Ideas

## Context
A research project overview page for "Mothership", a Polaris GEM E6 unmanned ground vehicle (UGV) autonomy platform that ferries two coordinated drones for search-and-rescue (SAR) missions. The GLIDE framework (Guided Long-horizon Integrated Drone Escort) is the primary research contribution. The audience is academic, robotics-adjacent, and technically sophisticated.

---

<response>
<probability>0.07</probability>
<text>
## Idea A — Technical Blueprint / Engineering Schematic

**Design Movement:** Bauhaus-meets-aerospace-technical-documentation  
**Core Principles:**
1. Information-first hierarchy — every pixel earns its place
2. Monochromatic base with a single vivid accent (electric amber) for critical callouts
3. Grid-ruled texture as a subtle background motif evoking engineering graph paper
4. Deliberate asymmetry — content blocks offset from center, creating tension and direction

**Color Philosophy:** Near-black (#0E0F11) background with off-white (#E8E6E0) body text. Electric amber (#F5A623) as the sole accent for labels, highlights, and hover states. The palette evokes precision instruments and field equipment.

**Layout Paradigm:** Full-bleed dark canvas. Hero uses a large left-aligned title block with the photo spanning the right 60% of the viewport. Sections alternate between full-width and two-column asymmetric splits. A thin amber vertical rule runs along the left edge of the page as a persistent structural element.

**Signature Elements:**
1. Monospaced section labels ("01 / Overview", "02 / Architecture") in amber
2. Thin hairline rules separating content blocks — no box shadows, no cards
3. Technical annotation overlays on the hero photo (callout lines pointing to drones, LiDAR, compute rack)

**Interaction Philosophy:** Minimal. Scroll-triggered fade-in for sections. Hover on callout labels reveals a brief tooltip. No gratuitous animation.

**Animation:** Sections enter with a 40px upward translate + opacity fade over 400ms ease-out. Stagger 80ms between sibling elements. No looping animations.

**Typography System:**
- Display: Space Grotesk Bold 700 (geometric, technical)
- Body: IBM Plex Mono Regular (monospaced, reinforces engineering aesthetic)
- Labels: Space Grotesk Medium 500, tracked +0.15em, uppercase
</text>
</response>

<response>
<probability>0.06</probability>
<text>
## Idea B — Field Operations / Military-Adjacent Tactical

**Design Movement:** Brutalist-functional with tactical field manual references  
**Core Principles:**
1. Raw, utilitarian honesty — no decorative chrome, only purposeful structure
2. High-contrast type on textured surfaces (subtle noise grain)
3. Color-coded role separation mirroring the UAV/UGV role taxonomy in the paper
4. Oversized section numerals as structural scaffolding

**Color Philosophy:** Warm off-white (#F2EFE8) base with deep charcoal (#1C1C1E) text. Olive green (#5C6B3A) for UAV-related elements, steel blue (#3A5C6B) for UGV elements, and rust (#8B3A2A) for warnings/highlights. Inspired by topographic maps and field manuals.

**Layout Paradigm:** Newspaper-style column grid. Hero is a full-bleed photo with a heavy type overlay. Below, content flows in a 3-column editorial grid that collapses to single column on mobile. Section headers are oversized (12vw) and partially clipped by the viewport edge.

**Signature Elements:**
1. Role-coded color chips next to each system component (UAV-1, UAV-2, UGV)
2. Oversized clipped section numerals as background decorative elements
3. Dashed border boxes for "key result" callouts, evoking field report annotations

**Interaction Philosophy:** Sections snap into place on scroll. Hovering a system component highlights its role-coded color across the page. Tactile, purposeful.

**Animation:** Section headers slide in from left with a 500ms ease-out. Body content fades up 200ms after header. Role-color highlights pulse once on entry.

**Typography System:**
- Display: Barlow Condensed ExtraBold (military stencil feel)
- Body: Barlow Regular (clean, legible at small sizes)
- Annotations: Courier New (typewriter, field-report authenticity)
</text>
</response>

<response>
<probability>0.08</probability>
<text>
## Idea C — Deep-Space Mission Control (CHOSEN)

**Design Movement:** NASA mission control meets contemporary dark-mode research portfolio  
**Core Principles:**
1. Dark canvas that makes the photo and data pop without visual noise
2. Structured data presentation — specs and metrics displayed as instrument readouts
3. Subtle luminous accents (cyan-blue) suggesting sensor data and telemetry streams
4. Generous whitespace within a tight structural grid — "breathing room inside a cockpit"

**Color Philosophy:** Deep navy-black (#080C14) background. Primary text in cool off-white (#D8E4F0). Accent in electric cyan (#00C8FF) for interactive elements, data labels, and highlights. Secondary accent in warm amber (#FFB347) for warnings and hardware callouts. The palette evokes OLED instrument panels and night-mode mission dashboards.

**Layout Paradigm:** Full-bleed hero with the photo as a cinematic backdrop. Below, an asymmetric two-column layout alternates between text-heavy left columns and visual/data right columns. A sticky top nav with translucent blur anchors the page. Horizontal rule dividers use a gradient fade (cyan → transparent → cyan) to suggest a scanning beam.

**Signature Elements:**
1. Glowing cyan "status indicators" (small animated dots) next to active system components
2. Spec tables styled as instrument readouts with monospaced values
3. Section labels prefixed with a small icon + "SYS_01", "SYS_02" notation

**Interaction Philosophy:** Smooth scroll with section-aware nav highlighting. Hover states on spec rows illuminate the full row. Scroll-triggered entrance animations suggest data loading into a display.

**Animation:** Hero text types in character-by-character (typewriter, 60ms/char). Section cards enter with a 30px upward translate + opacity over 500ms cubic-bezier(0.23, 1, 0.32, 1). Status dots pulse at 2s intervals. Stagger 60ms between sibling cards.

**Typography System:**
- Display: Syne ExtraBold 800 (geometric, futuristic, not Inter)
- Body: DM Sans Regular 400 (clean, modern, highly legible)
- Monospace/data: JetBrains Mono (instrument readouts, code snippets, specs)
</text>
</response>

---

## Selected Approach: **Idea C — Deep-Space Mission Control**

The dark, instrument-panel aesthetic best suits the technical nature of the research while creating a visually striking presentation. The cyan accent color mirrors the kind of telemetry displays used in real autonomous systems, and the layout gives the hero photo maximum visual impact.
