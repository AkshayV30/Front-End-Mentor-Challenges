import { navigate } from "./router/router.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

window.addEventListener("DOMContentLoaded", bootstrap);
window.addEventListener("popstate", handlePopState);

document.addEventListener("click", handleNavigation);

async function bootstrap() {
  try {
    renderHeader();
    renderFooter();

    const initialPage = getInitialRoute();

    await navigate(initialPage);
  } catch (err) {
    console.error("App initialization failed:", err);
  }
}

function getInitialRoute() {
  const hash = location.hash.replace("#", "");
  return hash || "home";
}

function handleNavigation(e) {
  const link = e.target.closest("[data-route]");
  if (!link) return;

  e.preventDefault();

  const page = link.dataset.route;

  history.pushState({ page }, "", `#${page}`);

  navigate(page);
}

function handlePopState(e) {
  const page = e.state?.page || getInitialRoute();

  navigate(page);
}
