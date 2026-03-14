import { productControlsTemplate } from "./productControls.template.js";

export function productInfoTemplate(product) {
  const discounted = product.price.toFixed(2);

  const original = Math.round(
    product.price / (1 - product.discount / 100),
  ).toFixed(2);

  return `
      <div class="c-product-info__text">

        <h4 class="c-product__brand">${product.company}</h4>
        <h1 class="c-product__title">${product.name}</h1>
        <p class="c-product__desc">${product.description} </p>

        <div class="c-product__price ">

          <div class="u-flex u-flex-gap-md u-flex-align">
            <strong class="c-product__current" > $${discounted} </strong> 
            <span class="c-product__discount" >${product.discount}%</span>
          </div>

          <p class="c-product-price__original"> <s>$${original}</s>  </p>

        </div>

        
      </div>
    
    ${productControlsTemplate()}

  `;
}
