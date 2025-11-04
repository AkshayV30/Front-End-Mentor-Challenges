'use strict';

import { fetchData } from './utils/fetchData.js';
import { renderHome } from './utils/renderHome.js';
import { renderCrew } from './utils/renderCrew.js';
import { renderDestinations } from './utils/renderDestinations.js';
import { renderTechnology } from './utils/renderTechnology.js';

export const contentsContainer = document.getElementById('contents');
export const navItems = document.querySelectorAll('.nav-list li');

export let data = {
  crew: [],
  destination: [],
  technology: [],
};
export let currentSection = 'home';

// === Initialize App ===
window.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  try {
    const [crew, destination, technology] = await Promise.all([
      fetchData('./src/data/data_crew.json', 'crew'),
      fetchData('./src/data/data_destinations.json', 'destinations'),
      fetchData('./src/data/data_technology.json', 'technology'),
    ]);
    data = { crew, destination, technology };
  } catch (err) {
    console.error('App initialization failed:', err);
  } finally {
    renderMain('home');
    attachNavListeners();
  }
}

// === Tab Switching ===
function attachNavListeners() {
  navItems.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.target === currentSection) return; // avoid redundant re-render
      navItems.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentSection = tab.dataset.target;
      renderMain(currentSection);
    });
  });
}

// === Section Renderer ===
export function renderMain(section) {
  contentsContainer.innerHTML = ''; // clear container
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
    default:
      contentsContainer.innerHTML = `<p class="error-text">⚠️ Section not found.</p>`;
  }
}
