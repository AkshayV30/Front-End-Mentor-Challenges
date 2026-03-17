import { countriesState } from "./countries.state.js";
import { uniqueRegions } from "../../shared/utils/helpers.js";
import { countryCard, bindCardNavigation } from "./countryCard.component.js";
import { filterUI } from "./countryFilter.component.js";
import { filterCountries } from "./countries.service.js";

let searchInput;
let regionSelect;

export function renderCountriesPage() {
  const page = document.getElementById("page");

  const regions = uniqueRegions(countriesState.countries);

  page.innerHTML = `

   <div class="l-container">

      ${filterUI(regions)}

      <div class="l-countries"></div>

   </div>

`;

  renderCountries();

  bindFilters();
}

// -----------------------------------------------------------------------------------------

function renderCountries() {
  const grid = document.querySelector(".l-countries");

  grid.innerHTML = countriesState.filtered.map(countryCard).join("");

  bindCardNavigation(grid);
}

// -----------------------------------------------------------------------------------------
export function bindFilters() {
  searchInput = document.getElementById("searchInput");
  regionSelect = document.getElementById("regionFilter");

  searchInput.addEventListener("input", handleFilterChange);
  regionSelect.addEventListener("input", handleFilterChange);
}

// -----------------------------------------------------------------------------------------
export function handleFilterChange() {
  const term = searchInput.value;
  const region = regionSelect.value;

  countriesState.filtered = filterCountries(
    countriesState.countries,
    term,
    region,
  );

  renderCountries();
}
