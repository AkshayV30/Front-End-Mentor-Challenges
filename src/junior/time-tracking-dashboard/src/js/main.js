'use strict';

import { fetchingFunction } from './utils/fetching.js';
import { renderData, setActiveTab } from './utils/render.js';

// === Elements ===
export const cardsContainer = document.getElementById('cards-contents');
export const tabs = document.querySelectorAll('.timeframe-selector button');

console.log(tabs);
// === Global Data ===
export let data = [];

// === Initialize ===
fetchingFunction();

// === Tab Switching ===
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.target;
    renderData(target);
  });
});
