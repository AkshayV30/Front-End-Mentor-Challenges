import { navigate } from "../router.js";

export function renderHome(app) {
  app.innerHTML = `
    <section class="l-section c-home u-fade-in">
      <div class="l-container c-home__wrapper">

        <div class="c-home__content">
          <h2 class="c-home__subtitle">
            So, you want to travel to
          </h2>

          <h1 class="c-home__title">
            SPACE
          </h1>

          <p class="c-home__description">
            Let’s face it: if you want to go to space, you might as well go to outer space
            and not just hover at the edge of it. Sit back, relax, and we’ll give you a truly
            out-of-this-world experience!
          </p>
        </div>

        <div class="c-home__action">
          <button class="c-btn c-btn--circle js-explore-btn">
            Explore
          </button>
        </div>

      </div>
    </section>
  `;

  app
    .querySelector(".js-explore-btn")
    .addEventListener("click", () => navigate("destination"));
}
