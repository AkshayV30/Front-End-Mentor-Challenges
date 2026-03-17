import { renderCountriesPage } from "../features/countries/countries.page.js";
import { renderDetailsPage } from "../features/countryDetails/details.page.js";

export function router() {
  window.addEventListener("popstate", handleRoute);

  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname;

  if (path.startsWith("/details")) {
    const name = decodeURIComponent(path.split("/")[2]);
    renderDetailsPage(name);
  } else {
    renderCountriesPage();
  }
}

export function navigate(path) {
  history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
}
