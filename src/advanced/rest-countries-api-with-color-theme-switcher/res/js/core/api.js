import { state } from "./state.js";

export async function loadCountries() {
  try {
    const res = await fetch("res/data/countryData.json");

    if (!res.ok) throw new Error(`Failed to load data.json: ${res.status}`);

    const data = await res.json();
    state.countries = data;
    state.filteredCountries = data;

    // console.log(data);
    // console.log(res);

    return data;
  } catch (error) {
    console.error("Error loading project data", error);
    return [];
  }
}
