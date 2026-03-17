import { navigate } from "../../app/router.js";

export function countryCard(country) {
  return `

  <div class="country-card" data-name="${country.name}">

      <img src="${country.flag}" />

      <div class="card-body">

          <h3>${country.name}</h3>

          <p>Population: ${country.population}</p>
          <p>Region: ${country.region}</p>

      </div>

  </div>

  `;
}

export function bindCardNavigation(container) {
  container.querySelectorAll(".country-card").forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;

      navigate(`/details/${encodeURIComponent(name)}`);
    });
  });
}
