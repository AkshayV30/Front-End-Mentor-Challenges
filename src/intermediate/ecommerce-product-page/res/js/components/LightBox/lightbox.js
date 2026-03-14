import { lightBoxTemplate } from "./lightbox.template.js";
import { state } from "../../core/state.js";

import {
  updateMainImage,
  bindThumbnails,
  nextImage,
  prevImage,
  bindKeyboardControls,
} from "../../utils/gallery.js";

export function renderLightBox(startIndex = 0) {
  const lightbox = document.querySelector(".l-lightbox-modal");

  state.currentImage = startIndex;
  lightbox.innerHTML = lightBoxTemplate();

  const lightboxContainer = lightbox.querySelector(".c-lightbox-contents");

  bindThumbnails(lightboxContainer);
  updateMainImage(lightboxContainer);

  const btnClose = lightboxContainer.querySelector(".btn-close");
  const btnPrev = lightboxContainer.querySelector(".btn-prev");
  const btnNext = lightboxContainer.querySelector(".btn-next");

  btnClose.addEventListener("click", () => lightbox.classList.add("is-hidden"));
  btnPrev.addEventListener("click", () => prevImage(lightboxContainer));
  btnNext.addEventListener("click", () => nextImage(lightboxContainer));

  // Keyboard support from utils
  bindKeyboardControls(lightbox, btnPrev, btnNext, btnClose);

  lightbox.classList.remove("is-hidden");
}
