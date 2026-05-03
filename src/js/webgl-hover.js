import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import gsap from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'; // Ensure gsap is globally available or imported if needed

export class WebGLHover {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.items = Array.from(this.container.querySelectorAll('article.interactive'));
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;

            // We hide the original image and replace it with a canvas
            const src = img.getAttribute('src');
            img.style.opacity = '0'; // Keep it for layout/accessibility, but hide visually

            // Basic Three.js setup for each image
            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
            camera.position.z = 1;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(item.clientWidth, item.clientHeight);
            
            // Set canvas absolute to cover the item
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.pointerEvents = 'none'; // let mouse events pass to article
            renderer.domElement.style.zIndex = '0';
            
            item.insertBefore(renderer.domElement, item.firstChild);

            const loader = new THREE.TextureLoader();
            loader.load(src, (texture) => {
                const geometry = new THREE.PlaneGeometry(2, 2);
                
                // Distortion Shader Material
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        uTexture: { value: texture },
                        uHoverState: { value: 0.0 }, // 0 to 1
                        uTime: { value: 0.0 }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform sampler2D uTexture;
                        uniform float uHoverState;
                        uniform float uTime;
                        varying vec2 vUv;
                        
                        void main() {
                            vec2 uv = vUv;
                            // Simple distortion logic based on hover
                            float distortion = sin(uv.y * 10.0 + uTime) * 0.05 * uHoverState;
                            uv.x += distortion;
                            
                            // Zoom effect
                            uv = (uv - 0.5) * (1.0 - 0.1 * uHoverState) + 0.5;
                            
                            vec4 color = texture2D(uTexture, uv);
                            gl_FragColor = color;
                        }
                    `
                });

                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                let isHovered = false;
                let hoverUniform = { value: 0 };
                let time = 0;

                item.addEventListener('mouseenter', () => {
                    isHovered = true;
                    // Note: Ensure GSAP is globally loaded
                    gsap.to(hoverUniform, {
                        value: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        onUpdate: () => { material.uniforms.uHoverState.value = hoverUniform.value; }
                    });
                });

                item.addEventListener('mouseleave', () => {
                    isHovered = false;
                    gsap.to(hoverUniform, {
                        value: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        onUpdate: () => { material.uniforms.uHoverState.value = hoverUniform.value; }
                    });
                });

                const animate = () => {
                    if (isHovered || hoverUniform.value > 0.01) {
                        time += 0.05;
                        material.uniforms.uTime.value = time;
                        renderer.render(scene, camera);
                    } else {
                        // Render once if not hovering to ensure static state
                        renderer.render(scene, camera);
                    }
                    requestAnimationFrame(animate);
                };
                
                // Initial render
                renderer.render(scene, camera);
                animate();
            });

            // Resizing handling
            window.addEventListener('resize', () => {
                renderer.setSize(item.clientWidth, item.clientHeight);
            });
        });
    }
}