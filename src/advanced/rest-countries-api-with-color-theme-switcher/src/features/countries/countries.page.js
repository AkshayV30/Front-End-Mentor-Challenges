import { appState } from "../../core/state.js";
import { filterCountries } from "./countries.service.js";

import { FilterComponent } from "../components/Filter.component.js";
import { GridComponent } from "../components/Grid.component.js";
import { uniqueRegions } from "../../shared/utils/helpers.js";

export function CountriesPage() {
  const root = document.querySelector(".js-page");
  if (!root) return;

  const regions = uniqueRegions(appState.countries);

  root.innerHTML = `
   <div class="js-filter__root l-filters u-flex u-items-center u-justify-between"> </div>
   <div class="js-grid__root l-countries u-grid  u-grid-justify-content-center u-grid-gap-4xl "></div>
  
`;
  const fRoot = root.querySelector(".js-filter__root");
  const gRoot = root.querySelector(".js-grid__root");

  renderFilter(fRoot, regions);
  renderGrid(gRoot);
}
// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------
function renderFilter(root, regions) {
  const Filter = FilterComponent({
    regions,
    filters: appState.filters,
    onChange: handleChange,
  });

  root.innerHTML = Filter.render();
  Filter.bind(root);
}
// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------
function renderGrid(root) {
  const Grid = GridComponent({
    countries: appState.filtered,
  });

  root.innerHTML = Grid.render();
  Grid.bind(root);
}

// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------
export function handleChange({ search, region } = {}) {
  const label = document.querySelector(".js-regionLabel");
  const gRoot = document.querySelector(".js-grid__root");

  if (region !== undefined) {
    appState.filters.region = region;
  }

  if (search !== undefined) {
    appState.filters.search = search.toLowerCase();
  }

  appState.filtered = filterCountries(
    appState.countries,
    appState.filters.search,
    appState.filters.region,
  );

  // console.log({
  //   search: appState.filters.search,
  //   region: appState.filters.region,
  //   results: appState.filtered.length,
  // });

  if (label) {
    label.textContent =
      appState.filters.region === "All"
        ? "Filter by Region"
        : appState.filters.region;
  }

  if (!gRoot) return;

  renderGrid(gRoot);
}
