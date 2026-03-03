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
        <img class="c-destination__image u-planet-spin js-dest-image" />
      </div>

      <div class="c-destination__body">

        <div class="c-destination__tabs js-tabs">
          ${data
            .map(
              (d, i) => `
            <div
              class="c-tab ${i === 0 ? "is-active" : ""}"
              data-index="${i}">
              ${d.name}
            </div>
          `,
            )
            .join("")}
        </div>

        <h2 class="c-destination__name js-dest-name"></h2>

        <p class="c-destination__description js-dest-description"></p>

        <div class="c-destination__meta">
          <div class="c-destination__stat">
            <h5 class="c-destination__label">Avg. Distance</h5>
            <p class="c-destination__value js-dest-distance"></p>
          </div>

          <div class="c-destination__stat">
            <h5 class="c-destination__label">Est. Travel Time</h5>
            <p class="c-destination__value js-dest-travel"></p>
          </div>
        </div>

      </div>

  </div>
</section>
`;

  const tabs = app.querySelector(".js-tabs");
  const imageEl = app.querySelector(".js-dest-image");
  const nameEl = app.querySelector(".js-dest-name");
  const descEl = app.querySelector(".js-dest-description");
  const distanceEl = app.querySelector(".js-dest-distance");
  const travelEl = app.querySelector(".js-dest-travel");

  function renderDetail(d) {
    // fade out
    imageEl.style.opacity = "0";
    imageEl.style.transform = "scale(0.95)";
    descEl.style.opacity = "0";

    setTimeout(() => {
      imageEl.src = d.images.png;
      imageEl.alt = d.name;

      nameEl.textContent = d.name;
      descEl.textContent = d.description;
      distanceEl.textContent = d.distance;
      travelEl.textContent = d.travel;

      // fade in
      imageEl.style.opacity = "1";
      imageEl.style.transform = "scale(1)";
      descEl.style.opacity = "1";
    }, 150);
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
