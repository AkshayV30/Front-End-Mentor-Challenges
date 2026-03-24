import { appState } from "../../core/state.js";
import { detailsComponent } from "./details.component.js";

export function DetailsPage(name) {
  const root = document.getElementById("page");

  const country = appState.countries.find((c) => c.name === name);

  root.innerHTML = detailsComponent(country);

  document
    .querySelector(".js-btn-detail-back")
    ?.addEventListener("click", () => {
      history.back();
    });
}
