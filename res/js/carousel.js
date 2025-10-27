// -----------------------------------------------------------------------------
// 🎠 Carousel Module
// -----------------------------------------------------------------------------
// ✅ PURPOSE:
// Handles initialization and logic for the image carousels used in project cards.
//
// ✅ BEHAVIOR:
// - Enables slide navigation using left/right buttons
// - Updates dot indicators to reflect current slide
// - Supports multiple carousel instances on the same page
// - Smoothly transitions between slides using CSS transform
//
// ✅ DEPENDENCIES:
// - DOM structure from `renderCards.js`
//   (Requires elements with `.carousel`, `.carousel__track`, `.carousel__button`, etc.)
//
// ✅ EXPORTS:
// - `initCarousel()` → initializes all carousels found on the page
//
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// 🚀 Initialize All Carousels
// -----------------------------------------------------------------------------
// Finds every `.carousel` element in the document and sets them up individually.
//
export function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => setupCarousel(carousel));
}

// -----------------------------------------------------------------------------
// ⚙️ Setup Individual Carousel
// -----------------------------------------------------------------------------
// Handles positioning of slides, button clicks, and indicator updates.
//
function setupCarousel(carousel) {
  // -----------------------------
  // 🧩 DOM References
  // -----------------------------
  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const nextBtn = carousel.querySelector('.carousel__button--right');
  const prevBtn = carousel.querySelector('.carousel__button--left');
  const dotsNav = carousel.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children);

  // Calculate width of each slide (assumes consistent sizing)
  const slideWidth = slides[0].getBoundingClientRect().width;

  // -----------------------------
  // 📐 Slide Positioning
  // -----------------------------
  // Position each slide horizontally based on its index
  slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
  });

  // -----------------------------
  // 🎯 Movement Logic
  // -----------------------------
  const moveToSlide = (targetIndex) => {
    // Move the entire track to show the target slide
    track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;

    // Update current slide state
    carousel.querySelector('.current-slide')?.classList.remove('current-slide');
    slides[targetIndex].classList.add('current-slide');

    // Update dot indicators
    dotsNav.querySelector('.current-slide')?.classList.remove('current-slide');
    dots[targetIndex].classList.add('current-slide');

    // Show/hide navigation buttons as needed
    prevBtn.classList.toggle('is-hidden', targetIndex === 0);
    nextBtn.classList.toggle('is-hidden', targetIndex === slides.length - 1);
  };

  // -----------------------------
  // 🧭 Button Navigation
  // -----------------------------
  nextBtn.onclick = () => moveToSlide((getCurrentIndex(slides) + 1) % slides.length);
  prevBtn.onclick = () =>
    moveToSlide((getCurrentIndex(slides) - 1 + slides.length) % slides.length);

  // -----------------------------
  // 🔘 Dot Indicator Navigation
  // -----------------------------
  dotsNav.onclick = (e) => {
    const idx = dots.indexOf(e.target.closest('button'));
    if (idx >= 0) moveToSlide(idx);
  };
}

// -----------------------------------------------------------------------------
// 🔍 Helper: Get Current Slide Index
// -----------------------------------------------------------------------------
// Finds which slide currently has the `.current-slide` class.
//
function getCurrentIndex(slides) {
  return slides.findIndex((s) => s.classList.contains('current-slide'));
}
