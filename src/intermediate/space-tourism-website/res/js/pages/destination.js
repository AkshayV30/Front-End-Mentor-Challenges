import { store } from "../store.js";

export const renderDestination = (app) => {
  const data = store.data.destination;

  app.innerHTML = `
    <section class="l-section l-container c-destination u-fade-in">
      
      <h1 class="c-destination__title">
        <span class="c-destination__index">01</span>
        Pick your destination
      </h1>
  
      <div class="c-destination__contents">  
      <div class="c-destination__tabs c-tabs js-tabs">
        ${data
          .map(
            (d, i) => `
              <div
                class="c-tab js-tab ${i === 0 ? "is-active" : ""}"
                data-index="${i}">
                ${d.name}
              </div>
            `,
          )
          .join("")}
      </div>

      <div class="c-destination__content js-content"></div>
    
    </div>
      </section>
  `;

  const tabs = app.querySelector(".js-tabs");
  const content = app.querySelector(".js-content");

  const renderDetail = (d) => {
    content.innerHTML = `
      <div class="c-destination__layout">

        <div class="c-destination__media">
          <img 
            class="c-destination__image"
            src="${d.images.png}" 
            alt="${d.name}" 
          />
        </div>

        <div class="c-destination__body">

          <h2 class="c-destination__name">${d.name}</h2>

          <p class="c-destination__description">
            ${d.description}
          </p>

          <div class="c-destination__meta">

            <div class="c-destination__stat">
              <h5 class="c-destination__label">Avg. Distance</h5>
              <p class="c-destination__value">${d.distance}</p>
            </div>

            <div class="c-destination__stat">
              <h5 class="c-destination__label">Est. Travel Time</h5>
              <p class="c-destination__value">${d.travel}</p>
            </div>

          </div>

        </div>
      </div>
    `;
  };

  renderDetail(data[0]);

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".js-tab");
    if (!tab) return;

    tabs
      .querySelectorAll(".js-tab")
      .forEach((t) => t.classList.remove("is-active"));

    tab.classList.add("is-active");

    renderDetail(data[tab.dataset.index]);
  });
};
