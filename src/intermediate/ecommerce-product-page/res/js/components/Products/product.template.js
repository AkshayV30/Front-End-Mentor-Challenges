export function productTemplate(product) {
  const discounted = product.price;
  const original = Math.round(product.price / (1 - product.discount / 100));

  return `
    <div class="txt">

            <h4>${product.company}</h4>
            <h1>${product.name}</h1>
            <p>${product.description}</p>

            <div class="price">
               <div>
                   <span id="price-bold">$${discounted.toFixed(2)}</span>
                   <span id="price-discount">${product.discount}%</span>
               </div>
   
            <p id="price-strike"><s>$${original.toFixed(2)}</s></p>

      </div>
    </div>
  `;
}
