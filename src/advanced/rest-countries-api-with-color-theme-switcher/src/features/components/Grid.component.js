import { countryCard, bindCardNavigation } from "./Card.component.js";

export function GridComponent({ countries }) {
  function render() {
    if (!countries.length) {
      return `<div class="c-has-no-country">No countries found</div>`;
    }

    return countries.map(countryCard).join("");
  }

  function bind(root) {
    bindCardNavigation(root);
  }

  return { render, bind };
}
