// import { renderCountriesPage } from "../countries/countries.page.js";
import { countriesState } from "../countries/countries.state.js";
import { detailsComponent } from "./details.component.js";

export function renderDetailsPage(name) {
  const page = document.getElementById("page");

  const country = countriesState.countries.find((c) => c.name === name);

  page.innerHTML = detailsComponent(country);

  const backBtn = document
    .querySelector(".js-btn-detail-back")
    .addEventListener("click", (e) => {
      // renderCountriesPage();
      history.back();
    });
}
