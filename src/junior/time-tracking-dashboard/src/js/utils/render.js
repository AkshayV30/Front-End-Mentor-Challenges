import { cardsContainer, data, tabs } from '../main.js';

export function renderData(period) {
  cardsContainer.innerHTML = '';

  if (!Array.isArray(data) || data.length === 0) {
    cardsContainer.innerHTML = `<p class="error">No data available.</p>`;
    return;
  }

  data.forEach(({ title, timeframes }) => {
    const frame = timeframes[period];
    if (!frame) return;

    const { current, previous } = frame;

    const card = document.createElement('div');
    card.className = 'card fade-in';

    card.innerHTML = `
        <div class="cards">
          <div class="card-header">
          <h3>${title}</h3>
          <a href="#" id="ellipsis">•••</a>
          </div>
          
          <div class="card-body">
          <h3 class="hours">${current}hr${current > 1 ? 's' : ''}</p>
          <p class="previous">Previous - ${previous}hr${previous > 1 ? 's' : ''}</p>
          </div>
        </div>
    `;

    cardsContainer.appendChild(card);
  });
}

export function setActiveTab(targetPeriod) {
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.target === targetPeriod);
  });
}
