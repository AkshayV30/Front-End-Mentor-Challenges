import { store } from "../store.js";

export function renderTechnology(app) {
  const tech = store.data.technologys;

  if (!tech?.length) {
    app.innerHTML = `<p class="u-error">Technology data unavailable.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="l-section l-container c-technology u-fade-in">

      <h2 class="c-technology__title">
        <span class="c-technology__index">03</span>
        Space Launch Technology
      </h2>

      <div class="c-technology__layout">

        <div class="c-technology__nav js-tech-nav">
          ${tech
            .map(
              (_, i) => `
            <button
              class="c-technology__btn js-tech-btn ${i === 0 ? "is-active" : ""}"
              data-index="${i}">
              ${i + 1}
            </button>
          `,
            )
            .join("")}
        </div>


          <div class="c-technology__content">
            <h3 class="c-technology__subtitle">
              The Terminology...
            </h3>

            <h1 class="c-technology__name js-tech-name"></h1>
            <p class="c-technology__description js-tech-desc"></p>
          </div>
          
        <picture class="c-technology__image-frame">
          <img class="c-technology__image js-tech-image" />
        </picture>

      

      </div>
    </section>
  `;

  // Cache once
  const nav = app.querySelector(".js-tech-nav");
  const imageEl = app.querySelector(".js-tech-image");
  const nameEl = app.querySelector(".js-tech-name");
  const descEl = app.querySelector(".js-tech-desc");

  function renderDetail(t) {
    // fade out via CSS class instead of inline style
    imageEl.classList.add("is-hidden");
    nameEl.classList.add("is-hidden");
    descEl.classList.add("is-hidden");

    requestAnimationFrame(() => {
      imageEl.src = t.images.portrait;
      imageEl.alt = t.name;

      nameEl.textContent = t.name;
      descEl.textContent = t.description;

      imageEl.classList.remove("is-hidden");
      nameEl.classList.remove("is-hidden");
      descEl.classList.remove("is-hidden");
    });
  }

  renderDetail(tech[0]);

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-tech-btn");
    if (!btn) return;

    nav
      .querySelectorAll(".js-tech-btn")
      .forEach((b) => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    renderDetail(tech[btn.dataset.index]);
  });
}
