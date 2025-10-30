import { cardsContainer, data, tabs } from '../main.js';

/**
 * Renders activity cards dynamically based on selected timeframe.
 * @param {string} period - One of 'daily', 'weekly', or 'monthly'.
 */
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

    // Normalize title for class usage (e.g., "Self Care" → "self-care")
    const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');

    // Map to specific background classes (extendable)
    const backgroundMap = {
      work: 'bg-work',
      play: 'bg-play',
      study: 'bg-study',
      exercise: 'bg-exercise',
      social: 'bg-social',
      'self-care': 'bg-selfcare',
    };

    const backgroundImageClass = backgroundMap[normalizedTitle] || 'bg-default';

    // Create card element
    const card = document.createElement('article');
    card.className = `card fade-in ${backgroundImageClass}`;

    // Build inner HTML (semantic & accessible)
    card.innerHTML = `
      <div class="cards-content">
        <header class="card-header">
          <h3 class="card-title">${title}</h3>
          <button class="ellipsis-btn" aria-label="Options">•••</button>
        </header>
        <div class="card-body">
          <p class="hours">${current}hr${current !== 1 ? 's' : ''}</p>
          <p class="previous">Previous - ${previous}hr${previous !== 1 ? 's' : ''}</p>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}

/**
 * Sets the active tab visually.
 * @param {string} targetPeriod - The period to highlight as active.
 */
export function setActiveTab(targetPeriod) {
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.target === targetPeriod);
  });
}
