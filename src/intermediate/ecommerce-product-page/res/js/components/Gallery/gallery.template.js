export function galleryTemplate(product) {
  return `
    <div class="c-gallery">
      <img class="c-gallery__main" src="${product.images[0].full}" alt="${product.name}">
  
      <div class="c-gallery__thumbs">
        ${product.images
          .map(
            (img, i) =>
              `<img class="c-gallery__thumb" data-index="${i}" src="${img.thumb}" alt="thumb-${i}">`,
          )
          .join("")}

      </div>
  </div>
           
  `;
}
