import { state } from "../../core/state.js";
import { productTemplate } from "./product.template.js";

export function renderProduct() {
  const container = document.querySelector("#product-info");

  container.innerHTML = productTemplate(state.selectedProduct);
}
