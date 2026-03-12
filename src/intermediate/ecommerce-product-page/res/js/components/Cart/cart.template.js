// export function cartTemplate(cart) {
//   if (cart.length === 0) {
//     return `<p class="cart-empty">Cart is empty</p>`;
//   } else {
//     return cart
//       .map(
//         (item) => `
//                   <div class="cart-item">
//                      <img src="${item.thumb}">

//                      <p>${item.name}</p>
//                      <p>${item.qty} x $${item.price}</p>
//                      <p>$${item.qty * item.price}</p>

//                   </div>

//                   <button data-id="${item.id}" class="remove-item">delete</button>

//                  `,
//       )
//       .join("");
//   }
// }

export function cartTemplate(cart) {
  if (cart.length === 0) {
    return `<p class="cart-empty">Cart is empty</p>`;
  }

  return cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.thumb}" alt="${item.name}">
        
        <div>
          <p>${item.name}</p>
          <p>${item.qty} × $${item.price} 
          <strong>$${item.qty * item.price}</strong></p>
        </div>

        <button data-id="${item.id}" class="remove-item">
          delete
        </button>
      </div>
    `,
    )
    .join("");
}
