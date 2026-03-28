import { navigate } from "../../router.js";

export function countryCard(country) {
  return `

  <div class="c-country-card u-flex u-col js-countryCard"  data-name="${country.name}">

      <img src="${country.flag}" />

      <div class="c-country-card__body u-flex u-col u-gap-sm u-flex-one">

          <h3>${country.name}</h3>

          <p><strong>Population : </strong>${country.population}</p>
          <p><strong> Region : </strong> ${country.region}</p>
          <p><strong> Capital : </strong>${country.capital}</p>
          

      </div>

  </div>

  `;
}

export function bindCardNavigation(root) {
  root.querySelectorAll(".js-countryCard").forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;
      navigate(`/details/${encodeURIComponent(name)}`);
    });
  });
}
