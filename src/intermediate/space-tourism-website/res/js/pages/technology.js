import { store } from "../store.js";

export function renderTechnology(app) {
  const tech = store.data.technology;

  if (!tech?.length) {
    app.innerHTML = `<p class="u-error">Technology data unavailable.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="l-section c-technology u-fade-in">
      <div class="l-container">

        <h2 class="c-technology__title">
          <span class="c-technology__number">03</span>
          Space Launch Technology
        </h2>

        <div class="c-technology__layout">

          <div class="c-technology__nav js-tech-nav">
            ${tech
              .map(
                (_, i) => `
                <button
                  class="c-technology__btn js-tech-btn ${
                    i === 0 ? "is-active" : ""
                  }"
                  data-index="${i}"
                  aria-label="Technology ${i + 1}">
                  ${i + 1}
                </button>
              `,
              )
              .join("")}
          </div>

          <div class="c-technology__content js-tech-content"></div>

        </div>
      </div>
    </section>
  `;

  const nav = app.querySelector(".js-tech-nav");
  const content = app.querySelector(".js-tech-content");

  renderDetail(tech[0]);

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-tech-btn");
    if (!btn) return;

    const index = Number(btn.dataset.index);

    nav
      .querySelectorAll(".js-tech-btn")
      .forEach((b) => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    renderDetail(tech[index]);
  });

  function renderDetail(t) {
    content.innerHTML = `
      <div class="c-technology__image">
        <img
          src="${t.images.landscape}"
          alt="${t.name}"
          loading="lazy"
        />
      </div>

      <div class="c-technology__info">
        <h3 class="c-technology__subtitle">
          The Terminology...
        </h3>

        <h1 class="c-technology__name">
          ${t.name}
        </h1>

        <p class="c-technology__description">
          ${t.description}
        </p>
      </div>
    `;
  }
}
