import { state } from "../../core/state.js";
import { removeItem } from "../../core/store.js";
import { cartTemplate } from "./cart.template.js";

export function renderCart() {
  const container = document.querySelector(".c-cart__content");

  container.innerHTML = cartTemplate(state.cart);

  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeItem(btn.dataset.id);
      renderCart();
    });
  });
}
