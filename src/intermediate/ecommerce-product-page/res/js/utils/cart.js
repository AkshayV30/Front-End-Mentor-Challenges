import { state } from "./../core/state";

// Update cart badge
export function updateCartBadge() {
  const badge = document.getElementById("c-cart-icon-badge");
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.classList.remove("is-hidden");
  } else {
    badge.textContent = 0;
    badge.classList.add("is-hidden");
  }
}

// Toggle cart visibility
export function setupCartToggle() {
  const cartIcon = document.getElementById("icon-cart-main");
  const cartContainer = document.querySelector(".l-cart");

  cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("is-hidden");
  });
}

/**
 * Sync product page quantity counter if product is in cart
 */
export function syncProductCounter(productId) {
  if (state.selectedProduct?.id !== productId) return;

  const productCount = document.querySelector(".c-product-controls__count");
  const cartItem = state.cart.find((item) => item.id === productId);
  productCount.textContent = cartItem ? cartItem.qty : 0;
}
