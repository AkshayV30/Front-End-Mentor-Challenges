import { store } from "../store.js";

export function renderCrew(app) {
  const crew = store.data.crews;

  if (!crew?.length) {
    app.innerHTML = `<p class="u-error">Crew data unavailable.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="l-section l-container c-crew u-fade-in">

      <h2 class="c-crew__title">
        <span class="c-crew__index">02</span>
        Meet Your Crew
      </h2>

      <div class="c-crew__layout">

        <div class="c-crew__text-col">
          <div class="c-crew__text js-crew-text"></div>

          <div class="c-crew__nav js-crew-nav">
            ${crew
              .map(
                (_, i) => `
              <button
                class="c-crew__dot ${i === 0 ? "is-active" : ""}"
                data-index="${i}">
              </button>
            `,
              )
              .join("")}
          </div>
        </div>

        <picture class="c-crew__image-frame">
          <img class="c-crew__image js-crew-image" />
        </picture>

      </div>
    </section>
  `;

  const crewText = app.querySelector(".js-crew-text");
  const crewImage = app.querySelector(".js-crew-image");
  const crewNav = app.querySelector(".js-crew-nav");

  function renderCrewDetail(member) {
    crewText.classList.add("is-hidden");
    crewImage.classList.add("is-hidden");

    requestAnimationFrame(() => {
      crewText.innerHTML = `
        <h3 class="c-crew__role">${member.role}</h3>
        <h1 class="c-crew__name">${member.name}</h1>
        <p class="c-crew__bio">${member.bio}</p>
      `;

      crewImage.src = member.images.png;
      crewImage.alt = member.name;

      crewText.classList.remove("is-hidden");
      crewImage.classList.remove("is-hidden");
    });
  }

  renderCrewDetail(crew[0]);

  crewNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".c-crew__dot");
    if (!btn) return;

    crewNav
      .querySelectorAll(".c-crew__dot")
      .forEach((b) => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    renderCrewDetail(crew[btn.dataset.index]);
  });
}
