import { header } from "../components/header.component.js";

export function mainLayout() {
  const app = document.getElementById("app");

  app.innerHTML = `
  
    ${header()}
  
    <main id="page"></main>
  
  `;
}
