import { galleryTemplate } from "./gallery.template.js";
import { state } from "../../core/state.js";
import { updateMainImage, bindThumbnails } from "../../utils/gallery.js";
import { renderLightBox } from "../LightBox/lightbox.js";

export function renderGallery() {
  const container = document.querySelector(".l-gallery");
  container.innerHTML = galleryTemplate(state.selectedProduct);

  bindThumbnails(container);
  updateMainImage(container);

  // open lightbox from current image
  container
    .querySelector(".c-gallery__main-img")
    .addEventListener("click", () => {
      renderLightBox(state.currentImage);
    });
}
