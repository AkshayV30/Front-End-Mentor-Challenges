export function cartTemplate(cart) {
  if (cart.length === 0) {
    return `<p class="cart-empty">Your cart is empty</p>`;
  }

  return (
    cart
      .map((item) => {
        const itemTotal = (item.qty * item.price).toFixed(2);

        return `
        <div class="c-cart__content-item u-flex u-flex-align u-flex-between">
          <img class="c-cart__thumb" src="${item.thumb}" alt="${item.name}">
          
          <div>
            <p class="c-cart__item-name">${item.name}</p>
            <p class="c-cart__item-price">
              $${item.price} × ${item.qty}
              =
              <strong class="c-cart__item-price--total">$${itemTotal}</strong>
            </p>
          </div>
        
          <button class="c-cart__delete-btn" data-id="${item.id}">
              <img 
                src="./res/assets/icons/icon-delete.svg"
                alt="remove item"
                class="c-cart__icon-delete"
              >
            </button>
        </div>
      `;
      })
      .join("") +
    `
      <button class="c-btn__checkout remove-item" type="button">
        Checkout
      </button>
    `
  );
}
