import { header } from "./../components/header.component.js";
import { initThemeToggle } from "../utils/themes.js";

export function mainLayout() {
  const app = document.getElementById("app");

  app.innerHTML = `
    ${header()}
    <main class="l-main-container js-page"></main>
  `;

  initThemeToggle();
}
