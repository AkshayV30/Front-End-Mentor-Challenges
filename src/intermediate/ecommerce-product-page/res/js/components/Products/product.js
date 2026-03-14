import { state } from "../../core/state.js";
import { productInfoTemplate } from "./productInfo.template.js";
import { renderCart } from "../Cart/cart.js";
import { updateCartBadge } from "../../utils/cart.js";

export function renderProduct() {
  const container = document.querySelector(".l-product-info");
  container.innerHTML = productInfoTemplate(state.selectedProduct);

  const btnProductSub = container.querySelector(".product-controls__sub");
  const btnProductAdd = container.querySelector(".product-controls__add");
  const btnProductAddCart = container.querySelector(".product-controls__cart");
  const productCountEl = container.querySelector(".c-product-controls__count");

  let productQty =
    state.cart.find((i) => i.id === state.selectedProduct.id)?.qty || 0;
  productCountEl.textContent = productQty;

  // Increase product count
  btnProductAdd.addEventListener("click", () => {
    productQty += 1;
    productCountEl.textContent = productQty;
  });

  // Decrease product count
  btnProductSub.addEventListener("click", () => {
    if (productQty > 0) productQty -= 1;
    productCountEl.textContent = productQty;
  });

  // Add to cart
  btnProductAddCart.addEventListener("click", () => {
    if (productQty <= 0) return; // ignore 0

    const existingItemIndex = state.cart.findIndex(
      (item) => item.id === state.selectedProduct.id,
    );

    if (existingItemIndex) {
      existingItemIndex.qty = productQty;
    } else {
      // Add new item
      state.cart.push({
        id: state.selectedProduct.id,
        name: state.selectedProduct.name,
        price: state.selectedProduct.price,
        thumb: state.selectedProduct.images[0].thumb,
        qty: productQty,
      });
    }

    renderCart();
    updateCartBadge();
  });
}
