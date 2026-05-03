document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // PHASE 1: CORE SETUP & REGISTRATION
    // -------------------------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    // Initialize ScrollTrigger defaults
    ScrollTrigger.defaults({ scroller: window });

    // Apply matchMedia to disable heavy WebGL/Parallax on mobile
    const mm = gsap.matchMedia();

    // -------------------------------------------------------------
    // PHASE 4: KINETIC TYPOGRAPHY & CURSOR SETUP
    // -------------------------------------------------------------
    // Create cursor if it exists, otherwise just setup the logic
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const cursorText = document.createElement('span');
    cursorText.classList.add('cursor-text');
    cursor.appendChild(cursorText);
    document.body.appendChild(cursor);

    gsap.set(cursor, { xPercent: -50, yPercent: -50, pointerEvents: 'none' });

    let xTo = gsap.quickTo(cursor, "x", {duration: 0.2, ease: "power3"}),
        yTo = gsap.quickTo(cursor, "y", {duration: 0.2, ease: "power3"});

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Use event delegation for dynamic CMS grid elements
    document.body.addEventListener('mouseover', (e) => {
        const interactive = e.target.closest('.interactive, a, button');
        if (interactive) {
            if (interactive.tagName === 'ARTICLE' && interactive.dataset.slug) {
                // Expanding the cursor to a 'View' bubble over case studies
                cursorText.innerText = "View";
                gsap.to(cursor, { 
                    width: 70, 
                    height: 70, 
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--bg-base)',
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
                gsap.to(cursorText, { opacity: 1, duration: 0.2, delay: 0.1 });
            } else {
                // Regular interactive hover (nav links, general buttons)
                gsap.to(cursor, { scale: 1.5, opacity: 0.5, backgroundColor: 'var(--accent-primary)', duration: 0.2 });
            }
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        const interactive = e.target.closest('.interactive, a, button');
        if (interactive) {
            cursorText.innerText = "";
            gsap.to(cursorText, { opacity: 0, duration: 0.1 });
            gsap.to(cursor, { 
                width: 20,
                height: 20,
                scale: 1, 
                opacity: 1, 
                backgroundColor: 'var(--text-primary)', 
                duration: 0.2 
            });
        }

        // Video Hover Stop Logic
        const card = e.target.closest('.project-card');
        if (card) {
            const video = card.querySelector('video');
            if (video) {
                video.pause();
                gsap.to(video, { opacity: 0.9, duration: 0.3 });
            }
        }
    });

    // Video Hover Start Logic (Delegation)
    document.body.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const video = card.querySelector('video');
            if (video) {
                video.play().catch(err => {});
                gsap.to(video, { opacity: 1, duration: 0.3 });
            }
        }
    });

    // -------------------------------------------------------------
    // ANIMATIONS DEFINED BY MEDIA QUERIES
    // -------------------------------------------------------------
    mm.add("(min-width: 800px)", () => {
        // --- PHASE 2: HERO & LOAD SEQUENCE ---

        const heroTl = gsap.timeline();

        // Stagger hero typography
        gsap.set(".hero-typography h1", { y: '100%', clipPath: 'inset(0)' });
        
        // Preloader wipe vertically
        heroTl
            .to("#preloader", {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut"
            })
            .to(".hero-typography h1", {
                y: '0%',
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.15,
            }, "-=0.2")
            // Showreel Fade
            .fromTo(".hero-video-wrapper", 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
                "-=0.8"
            )
            .fromTo(".hero-meta", 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );

        // --- PHASE 3: SCROLL-TRIGGERED TIMELINES ---
        
        // Non-Uniform Grid Parallax
        const gridItems = gsap.utils.toArray('.non-uniform-grid article');
        
        gridItems.forEach((item, i) => {
            gsap.to(item, {
                yPercent: -15 * (i % 2 === 0 ? 1 : 1.5), // Staggered parallax speed
                ease: "none",
                scrollTrigger: {
                    trigger: ".non-uniform-grid",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Surface Card Reveal
            gsap.fromTo(item, 
                { opacity: 0, scale: 0.95, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%", // Trigger when top of card hits 85% down viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        /* 
        // Kinetic typography header skew logic
        const displayHeaders = gsap.utils.toArray('.font-display');
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(displayHeaders, "skewY", "deg"),
            clamp = gsap.utils.clamp(-15, 15);

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -100);
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, {skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
                }
            }
        });
        */

        return () => {
            // cleanup if needed
        };
    });

    // Mobile specific/fallback matching simple fades
    mm.add("(max-width: 799px)", () => {
        const heroTl = gsap.timeline();
        
        gsap.set(".hero-typography h1", { opacity: 0, y: 20 });
        
        heroTl
            .to("#preloader", {
                yPercent: -100,
                duration: 0.8,
                ease: "power3.inOut"
            })
            .to(".hero-typography h1", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1
            }, "-=0.2")
            .fromTo(".hero-video-wrapper", 
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                "-=0.5"
            );

        const gridItems = gsap.utils.toArray('.non-uniform-grid article');
        gridItems.forEach((item) => {
            gsap.fromTo(item, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    }
                }
            );
        });
    });
});