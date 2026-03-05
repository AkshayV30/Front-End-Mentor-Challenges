import { routes } from "./routes.js";
import { store } from "../store.js";
import { fetchData } from "../api/fetchData.js";

import { setActiveNav } from "../components/header.js";
import { setPageState } from "./pageState.js";

const app = document.getElementById("app");

async function resolveData(route) {
  if (!route.data) return;

  const { path, key, storeKey } = route.data;

  if (!store.data[storeKey]?.length) {
    app.innerHTML = `<div class="u-loading"></div>`;

    const result = await fetchData(path, key);

    store.data[storeKey] = result;
  }
}

export async function navigate(page) {
  const route = routes[page];
  if (!route) return;

  app.innerHTML = "";

  store.currentPage = page;

  setActiveNav(page);
  setPageState(page);
  await resolveData(route);

  route.render(app);
}
