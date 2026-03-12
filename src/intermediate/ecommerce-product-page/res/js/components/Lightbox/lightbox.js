import { state } from "../../core/state.js";

export function initLightbox() {
  const lightbox = document.querySelector(".lightbox");

  document
    .querySelector(".close-btn")
    .addEventListener("click", () =>
      lightbox.classList.add("lightbox-visibility"),
    );

  document.querySelector(".left-btn").addEventListener("click", prevImage);

  document.querySelector(".right-btn").addEventListener("click", nextImage);
}

export function openLightbox(index) {
  state.currentImage = index;

  updateLightbox();

  document.querySelector(".lightbox").classList.remove("lightbox-visibility");
}

export function updateLightbox() {
  const img = state.selectedProduct.images[state.currentImage];

  document.querySelector(".lightbox-img").src = img.full;

  renderThumbs();
}

export function nextImage() {
  state.currentImage =
    (state.currentImage + 1) % state.selectedProduct.images.length;

  updateLightbox();
}

export function prevImage() {
  state.currentImage =
    (state.currentImage - 1 + state.selectedProduct.images.length) %
    state.selectedProduct.images.length;

  updateLightbox();
}

function renderThumbs() {
  const container = document.querySelector(".lightbox-thumbs");

  const imgs = state.selectedProduct.images;

  container.innerHTML = imgs
    .map(
      (img, i) => `
        <img
          class="lightbox-thumb"
          src="${img.thumb}"
          data-index="${i}"
        >
      `,
    )
    .join("");

  container.querySelectorAll(".lightbox-thumb").forEach((t) => {
    t.addEventListener("click", (e) => {
      state.currentImage = Number(e.target.dataset.index);
      updateLightbox();
    });
  });
}
