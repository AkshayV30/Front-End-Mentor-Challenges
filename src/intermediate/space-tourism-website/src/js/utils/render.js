import { contentsContainer, data, currentSection } from '../main.js';

export function renderMainData(section) {
  contentsContainer.innerHTML = ''; // clear area

  switch (section) {
    case 'home':
      renderHome();
      break;
    case 'destination':
      renderDestinations();
      break;
    case 'crew':
      renderCrew();
      break;
    case 'technology':
      renderTechnology();
      break;
  }
}

// --- HOME ---
function renderHome() {
  contentsContainer.innerHTML = `
    <section class="section__home fade-in">
      <div class="section__home-left-content">
        <h2>So, you want to travel to</h2>
        <h1>Space</h1>
        <div class="section__home-left-content-contain">
          Let’s face it; if you want to go to space, you might as well genuinely go to outer space
          and not hover kind of on the edge of it. Sit back, relax, and we’ll give you a truly
          out of this world experience!
        </div>
      </div>
      <button id="explore-btn" type="button">Explore</button>
    </section>
  `;

  document.getElementById('explore-btn').addEventListener('click', () => {
    renderMainData('destination');
  });
}

// --- DESTINATIONS ---
function renderDestinations() {
  const destinations = data.destination;
  if (!destinations) return;

  const navList = destinations.map((d) => `<li data-name="${d.name}">${d.name}</li>`).join('');

  contentsContainer.innerHTML = `
    <section class="section__destination fade-in">
      <h2><span>01</span> Pick Your Destination</h2>
      <ul class="destination-nav">${navList}</ul>
      <div id="destination-content" class="destination-content"></div>
    </section>
  `;

  const navItems = contentsContainer.querySelectorAll('.destination-nav li');
  navItems.forEach((item) =>
    item.addEventListener('click', () => {
      navItems.forEach((n) => n.classList.remove('active'));
      item.classList.add('active');
      const name = item.dataset.name;
      renderDestinationDetail(name);
    })
  );

  // default show Moon
  renderDestinationDetail('Moon');
}

function renderDestinationDetail(name) {
  const dest = data.destination.find((d) => d.name === name);
  if (!dest) return;

  const contentDiv = document.getElementById('destination-content');
  contentDiv.innerHTML = `
    <img src="${dest.images.png}" alt="${dest.name}" />
    <h1>${dest.name}</h1>
    <p>${dest.description}</p>
    <hr />
    <div class="stats">
      <div>
        <h4>Avg. Distance</h4>
        <p>${dest.distance}</p>
      </div>
      <div>
        <h4>Est. Travel Time</h4>
        <p>${dest.travel}</p>
      </div>
    </div>
  `;
}

// --- CREW ---
function renderCrew() {
  const crew = data.crew;
  if (!crew) return;

  contentsContainer.innerHTML = `
    <section class="section__crew fade-in">
      <h2><span>02</span> Meet Your Crew</h2>
      <div class="crew-content"></div>
      <div class="crew-nav"></div>
    </section>
  `;

  const crewNav = contentsContainer.querySelector('.crew-nav');
  crewNav.innerHTML = crew.map((_, i) => `<button data-index="${i}"></button>`).join('');

  crewNav.querySelectorAll('button').forEach((btn) =>
    btn.addEventListener('click', () => {
      crewNav.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = btn.dataset.index;
      renderCrewDetail(crew[idx]);
    })
  );

  renderCrewDetail(crew[0]); // default
}

function renderCrewDetail(member) {
  const content = contentsContainer.querySelector('.crew-content');
  content.innerHTML = `
    <h3>${member.role}</h3>
    <h1>${member.name}</h1>
    <p>${member.bio}</p>
    <img src="${member.images.png}" alt="${member.name}" />
  `;
}

// --- TECHNOLOGY ---
function renderTechnology() {
  const tech = data.technology;
  if (!tech) return;

  contentsContainer.innerHTML = `
    <section class="section__technology fade-in">
      <h2><span>03</span> Space Launch Technology</h2>
      <div class="tech-nav"></div>
      <div class="tech-content"></div>
    </section>
  `;

  const techNav = contentsContainer.querySelector('.tech-nav');
  techNav.innerHTML = tech.map((_, i) => `<button data-index="${i}">${i + 1}</button>`).join('');

  techNav.querySelectorAll('button').forEach((btn) =>
    btn.addEventListener('click', () => {
      techNav.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderTechDetail(tech[btn.dataset.index]);
    })
  );

  renderTechDetail(tech[0]); // default
}

function renderTechDetail(t) {
  const content = contentsContainer.querySelector('.tech-content');
  content.innerHTML = `
    <img src="${t.images.landscape}" alt="${t.name}" />
    <div>
      <h3>The Terminology...</h3>
      <h1>${t.name}</h1>
      <p>${t.description}</p>
    </div>
  `;
}
