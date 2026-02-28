import { store } from "./store.js";
import { renderHome } from "./pages/home.js";
import { renderCrew } from "./pages/crew.js";
import { renderDestination } from "./pages/destination.js";
import { renderTechnology } from "./pages/technology.js";

const routes = {
  home: renderHome,
  crew: renderCrew,
  destination: renderDestination,
  technology: renderTechnology,
};

export function navigate(page) {
  if (!routes[page]) return;

  // Update State
  store.currentPage = page;

  // Remove old page-* class
  document.body.classList.forEach((cls) => {
    if (cls.startsWith("page-")) {
      document.body.classList.remove(cls);
    }
  });

  // Update body state class
  document.body.className = `page-${page}`;

  /* 
   // if using data attributes:
    document.body.dataset.page = page;
  */

  //Render page
  const app = document.getElementById("app");
  app.innerHTML = "";

  routes[page](app);
}
