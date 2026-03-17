import { renderCountriesPage } from "./features/countries/countries.page.js";
import { renderDetailsPage } from "./features/countryDetails/details.page.js";

export function router() {
  window.addEventListener("hashchange", handleRoute);

  // run on first load
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const segments = hash.split("/");

  if (segments[1] === "details" && segments[2]) {
    const name = decodeURIComponent(segments[2]);
    renderDetailsPage(name);
    return;
  }

  renderCountriesPage();
}

export function navigate(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  window.location.hash = normalized;
}
