import { renderCountriesPage } from "../features/countries/countries.page.js";
import { renderDetailsPage } from "../features/countryDetails/details.page.js";

// Detect project base path automatically
const BASE_PATH = window.location.pathname.includes(
  "/rest-countries-api-with-color-theme-switcher",
)
  ? window.location.pathname.split(
      "/rest-countries-api-with-color-theme-switcher",
    )[0] + "/rest-countries-api-with-color-theme-switcher"
  : "";

export function router() {
  window.addEventListener("popstate", handleRoute);
  handleRoute();
}

function handleRoute() {
  let path = window.location.pathname;

  // remove base path for routing
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    path = path.replace(BASE_PATH, "");
  }

  const segments = path.split("/");

  if (segments[1] === "details" && segments[2]) {
    const name = decodeURIComponent(segments[2]);
    renderDetailsPage(name);
    return;
  }

  renderCountriesPage();
}

export function navigate(path) {
  history.pushState({}, "", BASE_PATH + path);
  handleRoute();
}
