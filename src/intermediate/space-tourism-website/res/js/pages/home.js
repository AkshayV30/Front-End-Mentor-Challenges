import { navigate } from "../router/router.js";

export function renderHome(app) {
  app.innerHTML = `
      <div class="c-home">
        <div class="c-home__content">
          <h2 class="c-home__subtitle"> So, you want to travel to   </h2>

          <h1 class="c-home__title"> space  </h1>

          <p class="c-home__description">
            Let’s face it: if you want to go to space, you might as well go to outer space
            and not just hover at the edge of it. Sit back, relax, and we’ll give you a truly
            out-of-this-world experience!
          </p>
        </div>

     
       <button class="c-btn c-btn--explore u-hover-pulse js-explore-btn">
            Explore
       </button>
   

      </div>
    `;

  app
    .querySelector(".js-explore-btn")
    .addEventListener("click", () => navigate("destination"));
}
