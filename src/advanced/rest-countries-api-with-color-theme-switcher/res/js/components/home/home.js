import { state } from "../../core/state.js";
import { countryCardTemplate } from "../Country/countryCard.template.js";

export function renderHome() {
  const container = document.querySelector(".l-main .l-country-content");
  container.innerHTML = state.filteredCountries
    .map(countryCardTemplate)
    .join("");

  // Add click listener for details page
  document.querySelectorAll(".c-card").forEach((card) => {
    card.addEventListener("click", () => {
      const code = card.dataset.country;
      const country = state.countries.find((c) => c.alpha3Code === code);
      state.selectedCountry = country;
      renderDetails();
    });
  });
}

// Filter countries by region
export function filterByRegion(region) {
  state.filteredCountries =
    region === "All"
      ? state.countries
      : state.countries.filter((c) => c.region === region);
  renderHome();
}

// Search countries
export function searchCountry(query) {
  const q = query.toLowerCase();
  state.filteredCountries = state.countries.filter((c) =>
    c.name.toLowerCase().includes(q),
  );
  renderHome();
}
