import { appState } from "./../../core/state.js";
// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------

export async function loadCountries() {
  try {
    const res = await fetch(
      "../../advanced/rest-countries-api-with-color-theme-switcher/public/data/countries.json",
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    console.log(data[0]);

    appState.countries = data;
    appState.filtered = data;
  } catch (error) {
    console.error("Failed to load countries:", error);

    appState.countries = [];
    appState.filtered = [];
  }
}
// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------
export function filterCountries(countries, search, region) {
  const searchTerm = search.toLowerCase();

  return countries.filter((country) => {
    const matchRegion = region === "All" || country.region === region;
    const matchSearch = country.name.toLowerCase().includes(searchTerm);

    return matchRegion && matchSearch;
  });
}

// -------------------------------------------------------------
/*                                                            */
// -------------------------------------------------------------

export function initRegionFilter(onChange) {
  const dropdown = document.getElementById("regionFilter");
  if (!dropdown) return;

  const trigger = dropdown.querySelector(".c-regionDropdown__trigger");
  const menu = dropdown.querySelector(".c-regionDropdown__menu");
  const label = dropdown.querySelector("#selectedRegion");

  if (!trigger || !menu || !label) return;

  // toggle
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("is-open");
  });

  // select option
  menu.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const value = btn.dataset.value;

    label.textContent = value === "All" ? "Filter by Region" : value;

    dropdown.classList.remove("is-open");

    onChange(value);
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("is-open");
    }
  });
}
