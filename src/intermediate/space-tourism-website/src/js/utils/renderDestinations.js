import { contentsContainer, data } from '../main.js';

export function renderDestinations() {
  const destinations = data.destination;
  if (!Array.isArray(destinations) || !destinations.length) {
    contentsContainer.innerHTML = `<p class="error-text">No destination data available.</p>`;
    return;
  }

  contentsContainer.innerHTML = `
    <section class="section-destination fade-in">
      <h2><span>01</span> Pick Your Destination</h2>
      <div class="destinations">
        <div class="destinations__tab-container">
          ${destinations
            .map(
              (d, i) =>
                `<div class="destination__tab ${
                  i === 0 ? 'destination__tab--active' : ''
                }" data-index="${i}">${d.name}</div>`
            )
            .join('')}
        </div>

        <div class="destinations__content-area">
          <div class="destination__content-wrapper"></div>
        </div>
      </div>
    </section>
  `;

  const tabContainer = contentsContainer.querySelector('.destinations__tab-container');
  const wrapper = contentsContainer.querySelector('.destination__content-wrapper');

  // ---- initial render ----
  renderDestinationDetail(destinations[0]);

  tabContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.destination__tab');
    if (!clicked) return;

    const index = Number(clicked.dataset.index);

    // update tab active state
    tabContainer.querySelectorAll('.destination__tab').forEach((btn) => {
      btn.classList.toggle('destination__tab--active', btn === clicked);
    });

    // trigger fade-out animation
    wrapper.classList.remove('fade-in');
    wrapper.classList.add('fade-out');

    // wait for fade-out, then update and fade-in again
    setTimeout(() => {
      renderDestinationDetail(destinations[index]);
      wrapper.classList.remove('fade-out');
      wrapper.classList.add('fade-in');
    }, 350); // matches CSS transition
  });

  // ---- inner renderer ----
  function renderDestinationDetail(d) {
    wrapper.innerHTML = `
      <div class="destination__content">
        <figure class="destination__figure">
          <img src="${d.images.png}" alt="${d.name}" loading="lazy" />
        </figure>
        <div class="destination-info">
          <h1>${d.name}</h1>
          <p class="destination__description">${d.description}</p>
          <div class="destination-stats">
            <div><h4>Avg. Distance</h4><p>${d.distance}</p></div>
            <div><h4>Est. Travel Time</h4><p>${d.travel}</p></div>
          </div>
        </div>
      </div>
    `;
  }
}
