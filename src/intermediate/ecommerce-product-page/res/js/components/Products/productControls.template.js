export function productControlsTemplate() {
  return `
    <div class="c-product-controls u-flex u-flex-align u-flex-gap-md">

      <div class="c-product-controls__qty">
        <button class="c-btn product-controls__sub" type="button">
          <img
            class="c-icon-minus"
            src="./res/assets/icons/icon-minus.svg"
            alt="minus"
          />
        </button>

        <span class="c-product-controls__count">0</span>

        <button class="c-btn product-controls__add" type="button">
          <img
            class="c-icon-plus"
            src="./res/assets/icons/icon-plus.svg"
            alt="plus"
          />
        </button>
      </div>

      <button class="c-btn product-controls__cart u-flex u-flex-align u-gap-sm" type="button">
        <img
          class="c-icon-cart"
          src="./res/assets/icons/icon-cart.svg"
          alt=""
        />
        <p > Add to cart </p>
      </button>

    </div>
  `;
}
