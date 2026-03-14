export function galleryTemplate(product) {
  return `

      <img class="c-gallery__main-img" src="${product.images[0].full}" alt="${product.name}">
  
      <div class="c-gallery__thumbs ">
        ${product.images
          .map(
            (img, i) =>
              `<img class="c-gallery__thumb-img" data-index="${i}" src="${img.thumb}" alt="thumb-${i}">`,
          )
          .join("")}

      </div>

           
  `;
}
