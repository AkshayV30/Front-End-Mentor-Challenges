import { mount } from "../core/renderer.js";
import { CountriesPage } from "../features/countries/countries.page.js";
import { DetailsPage } from "../features/countryDetails/details.page.js";

export function router() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/");

  if (parts[1] === "details") {
    mount(() => DetailsPage(decodeURIComponent(parts[2])));
  } else mount(CountriesPage);
}

export function navigate(path) {
  location.hash = path.startsWith("/") ? path : `/${path}`;
}
