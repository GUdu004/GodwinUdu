Read [AGENT.md](../../AGENT.md) before starting

# Feature Spec: 03 Components & GSAP Integration

## 1. Webflow Component Architecture
To ensure infinite scalability and zero code bloat, we strictly rely on a modular, component-driven approach.

### Core Components
| Component | Description | Role in 'Never Settle' Paradigm |
|-----------|-------------|---------------------------------|
| **Global Nav** | Minimalist header with Brutalist Sans-Serif marks | Non-intrusive navigation, invisible until scroll-up or explicit intent. |
| **Hero Showreel** | Auto-playing `<video>` wrapper with `will-change` hints and optimized WebP poster | Unobstructed initial impression. Sets the severe simplicity tone. |
| **Case Study Card** | Surface layer (`--bg-surface`) containing thumbnail, title, and metadata | Defines the non-uniform grid. Uses sharp geometries. |
| **Click-to-Load Wrapper**| Lightweight DOM element containing a poster image and play button | Strategic friction to prevent heavy video payload on main thread. |
| **Narrative Footer** | Vast negative space leading to an interactive contact journey | Pre-qualifies leads by demanding reading over an immediate form. |

## 2. GSAP Integration Roadmap (60fps Target)
All programmatic animations rely on GSAP for fluid 60fps hardware-accelerated movement.

### Phase 1: Core Setup & Registration
- Import GSAP Core + ScrollTrigger.
- Initialize `ScrollTrigger.defaults({ scroller: window })`.
- Apply `.gsap-hardware-accelerate` class (from `global.css`) selectively via JS to targets just before animation begins to manage memory.

### Phase 2: Hero & Load Sequence
- **Pre-loader:** Dark blue (`--bg-base`) veil wipes away vertically.
- **Hero Stagger:** Brutalist font (`--font-bold`) letters slide up from masks (`y: '100%', clipPath: 'inset(0)'`).
- **Showreel Fade:** Auto-play video fades in over 1.2s.

### Phase 3: Scroll-Triggered Timelines
- **Non-Uniform Grid Parallax:** Elements within the `.non-uniform-grid` have slight vertical staggered parallax based on ScrollTrigger scrub.
- **Surface Card Reveal:** As case study cards enter viewport, they scale from `0.95` to `1` with opacity `0` to `1`.
- **Horizontal Scroll Sections:** For deep dives on specific case studies, pinning sections horizontally.

### Phase 4: Kinetic Typography & Cursor
- Custom cursor blending with `--accent-primary` metallic gold.
- Ornamental retro serif (`--font-display`) headlines skewing and stretching slightly based on scroll velocity (tied to ScrollTrigger `onUpdate`).

## 3. Implementation Rules
- **No GSAP in `<head>`:** Defer GSAP scripts to end of `<body>` to prevent 'First Section' render blocking.
- **MatchMedia:** Use `gsap.matchMedia()` to disable heavy WebGL/Parallax on mobile, stripping it down to simple fades.
