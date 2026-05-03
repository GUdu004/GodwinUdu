export async function fetchCaseStudies() {
  try {
    const response = await fetch('./src/data/case-studies.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const caseStudies = await response.json();
    return caseStudies;
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return [];
  }
}

export function renderCaseStudiesGrid(caseStudies, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const gridHTML = caseStudies.map((study) => {
    return `
    <a href="${study.slug}.html" class="work-card gsap-hardware-accelerate interactive" data-slug="${study.slug}">
        <div class="work-card-media">
            <video 
                src="${study.thumbnailVideo}" 
                muted 
                loop 
                playsinline 
                loading="lazy"
            ></video>
        </div>
        <div class="work-card-info">
            <span class="work-card-client">${study.clientBrand}</span>
            <h3 class="work-card-title">${study.projectName}</h3>
        </div>
    </a>
  `;
  }).join('');

  container.innerHTML = gridHTML;

  // Add hover play/pause logic for dynamic items
  const cards = container.querySelectorAll('.work-card');
  cards.forEach(card => {
      const video = card.querySelector('video');
      card.addEventListener('mouseenter', () => {
          video.play().catch(err => console.log('Video play interrupted:', err));
      });
      card.addEventListener('mouseleave', () => {
          video.pause();
      });
  });
}