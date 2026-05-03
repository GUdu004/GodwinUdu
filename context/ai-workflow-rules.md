# AI Workflow Rules

## Approach

The portfolio will be built incrementally, treating Webflow as an enterprise-grade system based on the Never Settle paradigm. Context files define strictly what to build: starting with data/CMS structure, laying the minimal bold visual foundation, attaching GSAP kinetics, and loading optimized media last. Do not guess behavior or inject generic web patterns.

## Scoping Rules

- Work on one logical cluster at a time (e.g., Global styles & Typography -> CMS schemas -> Grid Layouts -> GSAP integrations).
- Assume performance constraints at all times. Do not output solutions that cause HTML bloat or excessive network blocking.
- The pure white-labeled viewing experience and 60fps requirement are absolute constraints.

## When to Split Work

Split implementation if dealing with both Webflow CMS data mapping and advanced GSAP timeline logic at the same time. Ensure the HTML/CSS structural DOM is perfectly minified before injecting timeline animations.

## Handling Missing Requirements

- If a specific asset format is unknown, ALWAYS default to high-compression WebP or SVG.
- If font choices are ambiguous, enforce native System Fonts to prioritize performance until explicit custom typography is defined.
- Do not implement heavy visual loaders or buffering screens that degrade the UX.

## Keeping Docs in Sync

Update \progress-tracker.md\ heavily after defining Webflow CMS schemas or achieving 60fps complex GSAP timelines.

## Before Moving to the Next Unit

1. The UX routing confirms the 'Strategic Friction' narrative is intact (no cheap basic generic form funnels).
2. 'First Section' performance maintains unblocked main threading.
3. DOM bloat is evaluated and component structures are unified.
