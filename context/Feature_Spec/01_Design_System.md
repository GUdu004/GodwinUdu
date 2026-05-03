Read  [AGENT.md](../../AGENT.md) before starting

# Feature Spec: 01 Design System

## 1. Overview
The Godwin Udu Motion Design Portfolio design system is rooted in the **'Never Settle'** paradigm. It embraces **Bold Minimalism**, utilizing severe simplicity, vast negative space, and non-uniform grid structures. The design language acts as a meticulously controlled frame that does not visually compete with the high-fidelity motion graphics hosted within.

## 2. Color Palette
To maintain focus on the portfolio pieces, the color palette is strictly limited to 3-5 colors.

| Role | CSS Variable | Value/Description |
| ---- | ------------ | ----------------- |
| **Page background** | `--bg-base` | **Future Dust** (dark blue with purple/grey undertones) |
| **Surface** | `--bg-surface` | Neutral contrast for case study cards |
| **Primary text** | `--text-primary` | High contrast (e.g., Off-white) |
| **Muted text** | `--text-muted` | Mid-tone neutral |
| **Primary accent** | `--accent-primary` | Vibrant Accent / Metallic Hue |

## 3. Typography
Typography is utilized to create tension—mixing highly ornamental styles with utilitarian fonts to establish sophisticated whimsy and brute impact.

| Role | Font Style | Variable | Setting / Notes |
| ---- | ---------- | -------- | --------------- |
| **Header / Display** | Highly ornamental retro serif | `--font-display` | Large display headers |
| **Accent / Bold** | Bold, condensed sans-serif | `--font-bold` | 'Never Settle' brutalist impact |
| **UI text** | System Font | `--font-ui` | Heavy interface text to prevent loading jank |

*Note: UI text relies strictly on system fonts to prevent the 'First Section' load problem where heavy custom fonts freeze the browser main thread.*

## 4. Layout & Grid Architecture
- **Component-Driven Architecture:** Relies strictly on Webflow native components tied seamlessly to the Webflow CMS, preventing DOM bloat and spaghetti CSS.
- **Hero Constraints:** Unobstructed auto-playing showreel taking the immediate viewport with zero clicks required.
- **Grids:** Highly scannable, non-uniform thumbnails with click-to-load video engagement.
- **Border Radius:** Sharp or meticulously consistent geometries to balance the non-uniform grid layouts without introducing visual chaos.

## 5. Animation & Interaction (GSAP)
- **Fluidity:** All programmatic animations, horizontal scroll timelines, and kinetic typography interactive states must run at a buttery-smooth **60fps**.
- **Zero Buffering:** The architecture leverages strategic click-to-load mechanics for heavy case study videos to preserve main thread performance.
- **Strategic Friction:** Narrative-driven journeys actively engage the user with the design philosophy before presenting complex contact forms, intentionally pre-qualifying the client.

## 6. Asset & Performance Invariants
- **Visual Assets:** Default to strict WebP/SVG formats for all static imagery.
- **Video Delivery:** Use paid Vimeo tiers for uncompressed case study playback and Cloudinary/Fastio/Mux for high-speed asset/raw video delivery.
- **Security & Purity:** Pure white-labeled viewing experience (completely stripping third-party UI controls, tracking scripts, and recommended videos to prevent attention hijacking).
- **Execution:** Enforce HTML/CSS/JS minification and strict deferral of non-critical heavy third-party scripts.