import { store } from "../store.js";

export const renderDestination = (app) => {
  const data = store.data.destinations;

  if (!data?.length) {
    app.innerHTML = `<p class="u-error">Destination data unavailable.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="l-section l-container c-destination u-fade-in">

      <h1 class="c-destination__title">
        <span class="c-destination__index">01</span>
        Pick your destination
      </h1>

      <div class="c-destination__layout">

        <div class="c-destination__media">
          <img class="c-destination__image js-image" />
        </div>

        <div class="c-destination__body">

          <div class="c-destination__tabs js-tabs">
            ${data
              .map(
                (d, i) => `
              <button
                class="c-tab ${i === 0 ? "is-active" : ""}"
                data-index="${i}">
                ${d.name}
              </button>
            `,
              )
              .join("")}
          </div>

          <h2 class="c-destination__name js-name"></h2>
          <p class="c-destination__description js-desc"></p>

          <div class="c-destination__meta">
            <div class="c-destination__stat">
              <h5 class="c-destination__label">Avg. Distance</h5>
              <p class="c-destination__value js-distance"></p>
            </div>

            <div class="c-destination__stat">
              <h5 class="c-destination__label">Est. Travel Time</h5>
              <p class="c-destination__value js-travel"></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  const tabs = app.querySelector(".js-tabs");
  const imageEl = app.querySelector(".js-image");
  const nameEl = app.querySelector(".js-name");
  const descEl = app.querySelector(".js-desc");
  const distanceEl = app.querySelector(".js-distance");
  const travelEl = app.querySelector(".js-travel");

  function renderDetail(d) {
    imageEl.classList.add("is-hidden");
    descEl.classList.add("is-hidden");

    requestAnimationFrame(() => {
      imageEl.src = d.images.png;
      imageEl.alt = d.name;

      nameEl.textContent = d.name;
      descEl.textContent = d.description;
      distanceEl.textContent = d.distance;
      travelEl.textContent = d.travel;

      imageEl.classList.remove("is-hidden");
      descEl.classList.remove("is-hidden");
    });
  }

  renderDetail(data[0]);

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".c-tab");
    if (!tab) return;

    tabs
      .querySelectorAll(".c-tab")
      .forEach((t) => t.classList.remove("is-active"));

    tab.classList.add("is-active");
    renderDetail(data[tab.dataset.index]);
  });
};
