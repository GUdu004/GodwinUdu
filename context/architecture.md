# Architecture Context

## Stack

| Layer     | Technology                  | Role   |
| --------- | --------------------------- | ------ |
| Framework | Webflow                     | Primary Visual Development Platform |
| Content   | Webflow CMS                 | Database-driven project generation |
| Animation | GSAP (GreenSock)            | Complex, programmatic 60fps animations |
| Video     | Vimeo (Paid) & Cloudinary   | Uncompressed playback & High-speed CDNs |

## System Boundaries

- \Webflow Designer\ — UI, responsive breakpoints, layout, and component-driven architecture.
- \Webflow CMS\ — Content models, case study metadata, narratives, and project mappings.
- \Custom Code\ — GSAP integration, complex timeline interactions, kinetic typography.

## Storage Model

- **Webflow CMS Database**: Project metadata, case study descriptions, role definitions, and textual content.
- **Vimeo / Cloudinary / Mux**: Heavy video artifacts, raw assets, uncompressed case study clips, optimized visual storage.

## Auth and Access Model

- Single owner (Godwin Udu) with access to Webflow Editor/Designer for updates.
- Public read-only access for end-users (Creative Directors, Recruiters) engaging with the portfolio.

## Invariants

1. Millisecond load times and strictly 60fps animations must be maintained natively without jank.
2. Video media must never buffer (utilizing click-to-load architecture and high-speed CDNs).
3. Third-party UI controls, tracking scripts, and recommended videos must be completely stripped to prevent attention hijacking.
4. Strict asset compression (WebP / SVG) enforced for all static visuals.
