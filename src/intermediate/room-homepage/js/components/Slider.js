import { slides } from "./../data.js";

export function createSlider(container) {
  if (!container) {
    console.warn("Slider: container not found");
    return { init: () => {}, destroy: () => {} };
  }

  /* ================= STATE ================= */
  let index = 1;
  let isAnimating = false;

  let startX = 0;
  let currentX = 0;
  let startTime = 0;

  let track, content, nextBtn, prevBtn;

  /* ================= HELPERS ================= */

  const getRealIndex = (i) => {
    if (i === 0) return slides.length - 1;
    if (i === slides.length + 1) return 0;
    return i - 1;
  };

  const getInfiniteSlides = () => [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  /* ================= RENDER ================= */

  function render() {
    const infiniteSlides = getInfiniteSlides();

    container.innerHTML = `
      
      <div class="hero__media">
          <div class="hero__track js-track">
        
              ${infiniteSlides
                .map(
                  (s) => `
                    <div class="hero__slide">
                      <picture>
                        <source media="(max-width:768px)" srcset="${s.imgMobile}">
                        <img src="${s.imgDesktop}" alt="${s.title}" class="hero__img"/>
                      </picture>
                    </div>
                  `,
                )
                .join("")}
              
          </div>
      </div>

      
      <div class="hero__controls">
            <button class="js-prev-btn">
              <img src="assets/icons/icon-angle-left.svg"/>
            </button>
            <button class="js-next-btn">
              <img src="assets/icons/icon-angle-right.svg"/>
            </button>
       
      </div>
      

      <div class="hero__content js-content"></div>

    `;
  }

  function cacheDOM() {
    track = container.querySelector(".js-track");
    content = container.querySelector(".js-content");
    nextBtn = container.querySelector(".js-next-btn");
    prevBtn = container.querySelector(".js-prev-btn");
  }

  /* ================= CONTENT ================= */

  function updateContent() {
    const realIndex = getRealIndex(index);
    const { title, desc } = slides[realIndex];

    content.innerHTML = `
      <h1>${title}</h1>
      <p>${desc}</p>

      <div class="hero__shop-now">
        <span>Shop now</span>
        <img src="assets/icons/icon-arrow.svg" alt="arrow"/>
      </div>
    `;
  }

  /* ================= SLIDE LOGIC ================= */

  function goToSlide(i, smooth = true) {
    if (isAnimating) return;

    isAnimating = true;
    index = i;

    track.style.transition = smooth
      ? "transform 0.6s cubic-bezier(0.22,1,0.36,1)"
      : "none";

    track.style.transform = `translate3d(-${index * 100}%,0,0)`;

    setTimeout(() => {
      if (index === 0) {
        index = slides.length;
        goToSlide(index, false);
      }

      if (index === slides.length + 1) {
        index = 1;
        goToSlide(index, false);
      }

      isAnimating = false;
      updateContent();
    }, 600);
  }

  /* ================= EVENTS ================= */

  const onNext = () => goToSlide(index + 1);
  const onPrev = () => goToSlide(index - 1);

  const onKey = (e) => {
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  /* ===== TOUCH (MOMENTUM) ===== */

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    currentX = startX;
    startTime = Date.now();

    track.style.transition = "none";
  }

  function onTouchMove(e) {
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    track.style.transform = `translate3d(calc(-${index * 100}% + ${diff}px),0,0)`;
  }

  function onTouchEnd() {
    const diff = currentX - startX;
    const time = Date.now() - startTime;
    const velocity = diff / time;

    if (Math.abs(diff) > 50 || Math.abs(velocity) > 0.3) {
      diff < 0 ? onNext() : onPrev();
    } else {
      goToSlide(index);
    }
  }

  function bindEvents() {
    nextBtn.addEventListener("click", onNext);
    prevBtn.addEventListener("click", onPrev);

    document.addEventListener("keydown", onKey);

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
  }

  function unbindEvents() {
    nextBtn?.removeEventListener("click", onNext);
    prevBtn?.removeEventListener("click", onPrev);

    document.removeEventListener("keydown", onKey);

    track?.removeEventListener("touchstart", onTouchStart);
    track?.removeEventListener("touchmove", onTouchMove);
    track?.removeEventListener("touchend", onTouchEnd);
  }

  /* ================= INIT ================= */

  function init() {
    render();
    cacheDOM();

    // start at first real slide
    goToSlide(1, false);
    updateContent();

    bindEvents();
  }

  function destroy() {
    unbindEvents();
    container.innerHTML = "";
  }

  return { init, destroy };
}
