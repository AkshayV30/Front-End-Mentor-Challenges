import { state } from "./state.js";

export async function loadProducts() {
  const res = await fetch("res/data/products.json");
  const data = await res.json();
  const base = data.config.productImageBase;

  console.log(data);
  console.log(base);

  state.config = data.config;

  state.products = data.products.map((product) => ({
    ...product,
    images: product.images.map((img) => ({
      full: base + img.full,
      thumb: base + img.thumb,
    })),
  }));

  state.selectedProduct = state.products[0];
}
