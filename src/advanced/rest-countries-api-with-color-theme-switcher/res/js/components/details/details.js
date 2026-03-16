import { state } from "../../core/state.js";
import { detailsTemplate } from "./details.template.js";

export function renderDetails() {
  const container = document.querySelector(".l-main");
  container.innerHTML = detailsTemplate(state.selectedCountry);

  document.querySelector(".btn-back").addEventListener("click", () => {
    container.innerHTML = "";
    renderHome();
  });
}
