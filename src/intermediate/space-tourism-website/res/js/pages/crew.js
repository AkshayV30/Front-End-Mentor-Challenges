import { store } from "../store.js";

export function renderCrew(app) {
  const crew = store.data.crew;

  if (!crew?.length) {
    app.innerHTML = `<p class="u-error">Crew data unavailable.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="l-section c-crew u-fade-in">
      <h2 class="c-crew__title">
        <span class="c-crew__number">02</span>
        Meet Your Crew
      </h2>

      <div class="c-crew__wrapper">
        <div class="c-crew__info js-crew-info"></div>

        <div class="c-crew__nav js-crew-nav">
          ${crew
            .map(
              (_, i) => `
              <button
                class="c-crew__dot js-crew-dot ${i === 0 ? "is-active" : ""}"
                data-index="${i}"
                aria-label="Crew member ${i + 1}">
              </button>
            `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  const crewInfo = app.querySelector(".js-crew-info");
  const crewNav = app.querySelector(".js-crew-nav");

  renderCrewDetail(crew[0]);

  crewNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-crew-dot");
    if (!btn) return;

    const index = Number(btn.dataset.index);

    crewNav
      .querySelectorAll(".js-crew-dot")
      .forEach((b) => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    renderCrewDetail(crew[index]);
  });

  function renderCrewDetail(member) {
    crewInfo.innerHTML = `
      <div class="c-crew__text">
        <h3 class="c-crew__role">${member.role}</h3>
        <h1 class="c-crew__name">${member.name}</h1>
        <p class="c-crew__bio">${member.bio}</p>
      </div>

      <div class="c-crew__image">
        <img
          src="${member.images.png}"
          alt="${member.name}"
          loading="lazy"
        />
      </div>
    `;
  }
}
