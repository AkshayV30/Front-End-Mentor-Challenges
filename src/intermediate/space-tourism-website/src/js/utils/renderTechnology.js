import { contentsContainer, data } from '../main.js';

export function renderTechnology() {
  const tech = data.technology;
  if (!tech?.length) {
    contentsContainer.innerHTML = `<p class="error-text">Technology data unavailable.</p>`;
    return;
  }

  contentsContainer.innerHTML = `
    <section class="section-technology fade-in">
      <h2><span>03</span> Space Launch Technology</h2>
      <div class="tech-nav">
        ${tech
          .map((_, i) => `<button class="tech-btn" data-index="${i}">${i + 1}</button>`)
          .join('')}
      </div>
      <div class="tech-content"></div>
    </section>
  `;

  const navBtns = contentsContainer.querySelectorAll('.tech-btn');
  navBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      navBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderTechDetail(tech[btn.dataset.index]);
    })
  );

  renderTechDetail(tech[0]);
}

function renderTechDetail(t) {
  const content = contentsContainer.querySelector('.tech-content');
  content.innerHTML = `
    <img src="${t.images.landscape}" alt="${t.name}" loading="lazy" />
    <div class="tech-info">
      <h3>The Terminology...</h3>
      <h1>${t.name}</h1>
      <p>${t.description}</p>
    </div>
  `;
}
