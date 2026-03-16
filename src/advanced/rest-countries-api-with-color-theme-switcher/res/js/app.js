import { loadCountries } from "./core/api.js";
import { homeTemplate } from "./components/home/home.template.js";
import {
  renderHome,
  filterByRegion,
  searchCountry,
} from "./components/home/home.js";

async function init() {
  await loadCountries();

  const root = document.getElementById("app-root");
  root.innerHTML = homeTemplate();

  renderHome();

  // Event listeners
  document.getElementById("regionFilter").addEventListener("change", (e) => {
    filterByRegion(e.target.value);
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchCountry(e.target.value);
  });
}

init();
