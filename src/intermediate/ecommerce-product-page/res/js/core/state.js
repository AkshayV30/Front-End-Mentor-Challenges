// export const state = {
//   config: {},
//   products: [],
//   cart: [],
//   selectedProduct: null,
//   currentImage: 0,
// };
export const state = {
  config: {
    productImageBase: "res/assets/products/",
  },

  products: [],

  cart: [
    {
      id: 1,
      name: "Fall Limited Edition Sneakers",
      price: 125,
      thumb: "res/assets/products/thumbnail-product-1.jpg",
      qty: 3,
    },
  ],

  selectedProduct: null,
  currentImage: 0,
};
