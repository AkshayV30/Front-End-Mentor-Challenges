import { mainLayout } from "./shared/layouts/main.layout.js";
import { router } from "./router.js";
import { loadCountries } from "./features/countries/countries.service.js";

async function init() {
  mainLayout();

  await loadCountries();

  router();
}

init();
