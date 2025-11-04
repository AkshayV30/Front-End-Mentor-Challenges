'use strict';

import { fetchData } from './utils/fetchData.js';
import { renderHome } from './utils/renderHome.js';
import { renderCrew } from './utils/renderCrew.js';
import { renderDestinations } from './utils/renderDestinations.js';
import { renderTechnology } from './utils/renderTechnology.js';

export const contentsContainer = document.getElementById('contents');
export const navItems = document.querySelectorAll('.nav-list-item');

export let data = { crew: [], destination: [], technology: [] };
export let currentSection = 'home';

const renderMap = {
  home: renderHome,
  destination: renderDestinations,
  crew: renderCrew,
  technology: renderTechnology,
};

// --- Fade-in preload fix ---
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
  document.body.classList.add('loaded');
});

window.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  try {
    document.body.setAttribute('data-type', 'home');

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

function attachNavListeners() {
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (!target || target === currentSection) return;

      // --- Update nav active state ---
      navItems.forEach((el) => el.classList.remove('active'));
      item.classList.add('active');

      // --- Hybrid background + fade animation ---
      document.body.setAttribute('data-type', target);

      // Safely reset only page-related classes, keep preload/loaded intact
      document.body.classList.forEach((cls) => {
        if (cls.startsWith('page-')) document.body.classList.remove(cls);
      });

      // Add page transition class back
      document.body.classList.add(`page-${target}`, 'loaded');

      currentSection = target;
      renderMain(target);
    });
  });
}

export function renderMain(section) {
  contentsContainer.innerHTML = '';
  const renderFn = renderMap[section];
  if (typeof renderFn === 'function') renderFn();
  else contentsContainer.innerHTML = `<p class="error-text">⚠️ Section not found.</p>`;
}
