import { state } from "../../core/state.js";
import { galleryTemplate } from "./gallery.template.js";
import { openLightbox } from "../Lightbox/lightbox.js";

export function renderGallery() {
  const container = document.querySelector("#gallery-item");

  container.innerHTML = galleryTemplate(state.selectedProduct);

  const thumbs = container.querySelectorAll(".c-gallery__thumb");

  thumbs.forEach((t) => {
    t.addEventListener("click", (e) => {
      const i = e.target.dataset.index;

      document.querySelector(".c-gallery__main").src =
        state.selectedProduct.images[i].full;

      state.currentImage = i;
    });
  });

  container.querySelector(".c-gallery__main").addEventListener("click", () => {
    openLightbox(state.currentImage);
  });
}
