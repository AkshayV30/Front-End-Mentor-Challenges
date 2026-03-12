import { state } from "../../core/state.js";
import { openLightbox } from "../../lightbox.js";

const galleryContainer = document.querySelector(".container-gallery");

export function createGallery() {
  state.products.forEach((p, idx) => {
    const div = document.createElement("div");

    div.className = "gallery-item";

    div.innerHTML = `
      <input type="radio"
        name="gallery"
        class="gallery-selector"
        id="gallery-${idx}"
        ${idx === 0 ? "checked" : ""}
      >

      <img class="gallery-img"
           src="${p.img}"
           alt="product-${idx}">
    `;

    galleryContainer.appendChild(div);

    div
      .querySelector(".gallery-img")
      .addEventListener("click", () => openLightbox(idx));
  });
}

/*
 <div class="lightbox-container">
        <button class="close-btn">
          <img src="./res/assets/icons/icon-close.svg" alt="close-btn" />
        </button>

        <button class="left-btn">
          <img src="./res/assets/icons/icon-previous.svg" alt="previous icon" />
        </button>

        <img class="lightbox-img" src="" alt="product image" />

        <button class="right-btn">
          <img src="./res/assets/icons/icon-next.svg" alt="forward icon" />
        </button>

        <div class="lightbox-thumbs"></div>
      </div>
*/
