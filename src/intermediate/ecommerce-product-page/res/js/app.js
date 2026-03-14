import { loadProducts } from "./core/api.js";

import { renderGallery } from "./components/Gallery/gallery.js";
import { renderCart } from "./components/Cart/cart.js";
import { renderProduct } from "./components/Products/product.js";
import { setupCartToggle, updateCartBadge } from "./utils/cart.js";

async function init() {
  await loadProducts();

  renderGallery();
  renderProduct();
  renderCart();
  setupCartToggle();
  updateCartBadge();
}

init();
