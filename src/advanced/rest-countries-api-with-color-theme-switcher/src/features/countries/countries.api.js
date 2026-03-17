import { countriesState } from "./countries.state.js";

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

    countriesState.countries = data;
    countriesState.filtered = data;
  } catch (error) {
    console.error("Failed to load countries:", error);

    countriesState.countries = [];
    countriesState.filtered = [];
  }
}
