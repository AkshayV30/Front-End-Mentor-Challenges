import { loadProducts } from "./core/api.js";

import { renderGallery } from "./components/Gallery/gallery.js";
import { renderCart } from "./components/Cart/cart.js";
import { renderProduct } from "./components/Products/product.js";
import { initLightbox } from "./components/Lightbox/lightbox.js";

async function init() {
  await loadProducts();

  // renderGallery();
  // renderProduct();
  renderCart();

  // initLightbox();
}

init();
