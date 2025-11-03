'use strict';

import { fetchCrew, fetchDestination, fetchTechnology } from './utils/fetching.js';
import { renderMainData } from './utils/render.js';

export const contentsContainer = document.getElementById('contents');
export const homeNavItems = document.querySelectorAll('.home-nav-item-selector li');

export let currentSection = 'home'; // keep track of current tab
export let data = {}; // holds all data

// === Initialize app ===
window.addEventListener('DOMContentLoaded', async () => {
  // preload all JSONs
  const [crew, destination, technology] = await Promise.all([
    fetchCrew(),
    fetchDestination(),
    fetchTechnology(),
  ]);

  data = { crew, destination, technology };
  renderMainData('home');
});

// === Tab Switching ===
homeNavItems.forEach((tab) => {
  tab.addEventListener('click', () => {
    homeNavItems.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.target;
    currentSection = target;
    renderMainData(target);
  });
});
