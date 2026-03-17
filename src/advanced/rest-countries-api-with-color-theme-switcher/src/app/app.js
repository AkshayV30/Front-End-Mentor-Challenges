import { mainLayout } from "../shared/layout/main.layout.js";
import { router } from "./router.js";
import { loadCountries } from "../features/countries/countries.api.js";

async function init() {
  mainLayout();

  await loadCountries();

  router();
}

init();
