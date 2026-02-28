import { store } from "../store.js";

export function renderDestination(app) {
  const data = store.data.destination;

  app.innerHTML = `
    <section class="l-section c-destination u-fade-in">
      <div class="c-tabs js-tabs">
        ${data
          .map(
            (d, i) =>
              `<button class="c-tab js-tab ${i === 0 ? "is-active" : ""}"
                data-index="${i}">
                ${d.name}
              </button>`,
          )
          .join("")}
      </div>

      <div class="c-destination__content js-content"></div>
    </section>
  `;

  const tabs = app.querySelector(".js-tabs");
  const content = app.querySelector(".js-content");

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

  function renderDetail(d) {
    content.innerHTML = `
      <img src="${d.images.png}" alt="${d.name}" />
      <div>
        <h2>${d.name}</h2>
        <p>${d.description}</p>
      </div>
    `;
  }
}
