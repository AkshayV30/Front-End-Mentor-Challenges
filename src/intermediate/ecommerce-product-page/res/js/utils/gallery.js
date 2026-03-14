import { state } from "../core/state";
/**
 * Update the main image in any container (gallery or lightbox)
 */
export function updateMainImage(container) {
  const mainImg = container.querySelector(".c-gallery__main-img");
  if (!mainImg) return;

  const img = state.selectedProduct.images[state.currentImage];
  mainImg.src = img.full;

  // Update active thumbnail
  const thumbs = container.querySelectorAll(".c-gallery__thumb-img");
  thumbs.forEach((t) => t.classList.remove("is-active"));
  if (thumbs[state.currentImage])
    thumbs[state.currentImage].classList.add("is-active");
}

/**
 * Attach click events to thumbnails in any container
 */
export function bindThumbnails(container) {
  const thumbs = container.querySelectorAll(".c-gallery__thumb-img");
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      state.currentImage = Number(e.target.dataset.index);
      updateMainImage(container);
    });
  });
}

/**
 * Navigation helpers for next / prev
 */
export function nextImage(container) {
  state.currentImage =
    (state.currentImage + 1) % state.selectedProduct.images.length;
  updateMainImage(container);
}

export function prevImage(container) {
  state.currentImage =
    (state.currentImage - 1 + state.selectedProduct.images.length) %
    state.selectedProduct.images.length;
  updateMainImage(container);
}

/**
 * Attach keyboard navigation for a container (lightbox or any modal)
 * @param {HTMLElement} container - The modal/lightbox container
 * @param {HTMLElement} btnPrev - Prev button inside container
 * @param {HTMLElement} btnNext - Next button inside container
 * @param {HTMLElement} btnClose - Close button inside container
 */
export function bindKeyboardControls(container, btnPrev, btnNext, btnClose) {
  const handler = (e) => {
    if (container.classList.contains("is-hidden")) return;

    if (e.key === "ArrowRight") btnNext.click();
    if (e.key === "ArrowLeft") btnPrev.click();
    if (e.key === "Escape") btnClose.click();
  };

  document.addEventListener("keydown", handler);

  // optional: return a function to remove the listener if needed
  return () => document.removeEventListener("keydown", handler);
}
