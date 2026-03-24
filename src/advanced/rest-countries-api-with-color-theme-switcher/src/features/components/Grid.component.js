import { countryCard, bindCardNavigation } from "./Card.component.js";

export function GridComponent({ countries }) {
  function render() {
    if (!countries.length) {
      return `<p>No countries found</p>`;
    }

    return countries.map(countryCard).join("");
  }

  function bind(root) {
    bindCardNavigation(root);
  }

  return { render, bind };
}
