import { state } from "../../core/state.js";
import { cartTemplate } from "./cart.template.js";
import { updateCartBadge, syncProductCounter } from "../../utils/cart.js";

export function renderCart() {
  const container = document.querySelector(".c-cart__content");

  container.innerHTML = cartTemplate(state.cart);

  // Delete item
  container.querySelectorAll(".c-cart__delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      state.cart = state.cart.filter((item) => item.id !== id);
      renderCart();
      updateCartBadge();
      syncProductCounter(id);
    });
  });

  // Increase quantity inside cart

  container.querySelectorAll(".cart-item-add").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".c-cart__content-item");
      const id = parseInt(parent.dataset.id);

      const item = state.cart.find((i) => i.id === id);
      item.qty += 1;
      renderCart();
      updateCartBadge();
      syncProductCounter(id);
    });
  });

  // Decrease quantity inside cart
  container.querySelectorAll(".cart-item-sub").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".c-cart__content-item");
      const id = parseInt(parent.dataset.id);

      const item = state.cart.find((i) => i.id === id);
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== id);
      }
      renderCart();
      updateCartBadge();
      syncProductCounter(id);
    });
  });
}
