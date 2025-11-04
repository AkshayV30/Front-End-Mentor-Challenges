import { contentsContainer, data } from '../main.js';

export function renderCrew() {
  const crew = data.crew;
  if (!crew?.length) {
    contentsContainer.innerHTML = `<p class="error-text">Crew data unavailable.</p>`;
    return;
  }

  contentsContainer.innerHTML = `
    <section class="section-crew fade-in">
      <h2><span>02</span> Meet Your Crew</h2>
      <div class="crew-wrapper">
        <div class="crew-info"></div>
        <div class="crew-nav"></div>
      </div>
    </section>
  `;

  const crewNav = contentsContainer.querySelector('.crew-nav');
  crewNav.innerHTML = crew
    .map((_, i) => `<button data-index="${i}" class="crew-dot"></button>`)
    .join('');

  crewNav.querySelectorAll('button').forEach((btn) =>
    btn.addEventListener('click', () => {
      crewNav.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCrewDetail(crew[btn.dataset.index]);
    })
  );

  renderCrewDetail(crew[0]);
}

function renderCrewDetail(member) {
  const content = contentsContainer.querySelector('.crew-info');
  content.innerHTML = `
    <h3>${member.role}</h3>
    <h1>${member.name}</h1>
    <p>${member.bio}</p>
    <img src="${member.images.png}" alt="${member.name}" loading="lazy" />
  `;
}
