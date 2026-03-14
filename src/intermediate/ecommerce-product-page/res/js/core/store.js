import { state } from "./state.js";

export function addItem(product, qty) {
  const existing = state.cart.find((i) => i.id === product.id);

  if (existing) {
    existing.qty += qty;
    return;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      thumb: product.images[0].thumb,
      qty,
    });
  }
}

export function removeItem(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
}

export function cartTotal() {
  return state.cart.reduce((sum, i) => sum + i.qty * i.price, 0);
}
