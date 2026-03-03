import { store } from "./store.js";
import { renderHome } from "./pages/home.js";
import { renderCrew } from "./pages/crew.js";
import { renderDestination } from "./pages/destination.js";
import { renderTechnology } from "./pages/technology.js";
import { fetchData } from "./api/fetchData.js";
import { setActiveNav } from "./components/header.js";

const routes = {
  home: {
    render: renderHome,
  },
  crew: {
    render: renderCrew,
    data: {
      path: "res/data/crews.json",
      key: "crews",
      storeKey: "crews",
    },
  },
  destination: {
    render: renderDestination,
    data: {
      path: "res/data/destinations.json",
      key: "destinations",
      storeKey: "destinations",
    },
  },
  technology: {
    render: renderTechnology,
    data: {
      path: "res/data/technologys.json",
      key: "technologys",
      storeKey: "technologys",
    },
  },
};

export async function navigate(page) {
  const route = routes[page];
  if (!route) return;

  const app = document.getElementById("app");
  app.innerHTML = "";

  store.currentPage = page;
  setActiveNav(page);

  // Update body class
  document.body.className = `page-${page}`;

  //  Lazy fetch if route has data and not already loaded
  if (route.data) {
    const { path, key, storeKey } = route.data;

    if (!store.data[storeKey]?.length) {
      app.innerHTML = `<div class="u-loading"> </div>`;

      const result = await fetchData(path, key);
      store.data[storeKey] = result;
    }
  }

  route.render(app);
}
