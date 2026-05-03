# Code Standards

## General

- Treat the portfolio website as an award-worthy project itself (matching CSSDA / Awwwards standards).
- Prevent the 'First Section' problem: eliminate performance bottlenecks blocking the main rendering thread immediately upon page load.
- Use Component-Driven Architecture to prevent DOM bloat and spaghetti CSS.

## Webflow & CMS

- Do not manually recreate HTML structure or inline CSS classes for every case study.
- Engineer a master 'Project Page' template within the Webflow CMS that dynamically populates video links, text, and roles globally.
- Strictly avoid stacking multiple heavy iframes per page to prevent forcing mobile browsers to crash.

## Performance & Optimization

- **Asset Compression**: All static visuals, storyboards, and mockups MUST be converted to next-generation formats (WebP or SVG), realizing ~50% savings over JPEGs.
- **Code Minification**: HTML, CSS, and JavaScript minification must be enabled in the build/hosting environment.
- **Script Deferral**: Analytics, tracking, or non-critical UI scripts must be set to \defer\ or \sync\ to not block the visual DOM parsing.

## Animation & GSAP Integrations

- Utilize native Webflow GSAP integration for complex timeline control, programmatic logic, and interpolation.
- Achieve buttery-smooth 60fps exclusively. 
- Tie heavy playback triggers and interactivity to user interaction (click-to-load) and scroll position to heavily conserve background rendering resources.

## Styling & Typography

- Limit UI color variables strictly to 3-5 tokens (\--bg-base\, \--accent-primary\, etc) to let video pop.
- Prioritize system fonts for standard interface and heavy block text.
- Reserve heavy custom web fonts strictly for large display headers to prevent text-rendering delays.
