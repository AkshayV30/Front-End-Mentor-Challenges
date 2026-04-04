import { slides } from "./../data.js";

export function createSlider(container) {
  let index = 0;
  let elements = {};
  let isAnimating = false;
  let startX = 0;

  if (!container) {
    console.warn("Slider: container not found");
    return { init: () => {}, destroy: () => {} };
  }

  function getImage(s) {
    return window.matchMedia("(max-width:768px)").matches
      ? s.imgMobile
      : s.imgDesktop;
  }
  function preloadImages() {
    slides.forEach((s) => {
      [s.imgMobile, s.imgDesktop].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }

  function render() {
    container.innerHTML = `
      <div class="hero">

        <div class="hero__media">
          <div class="hero__track js-track">
            ${slides
              .map(
                (s) => `
             <div 
                class="hero__slide js-hero__slide" 
                style="background-image: url('${getImage(s)}')"></div>
            `,
              )
              .join("")}
          </div>


           <div class="hero__controls">
            <button class="js-prev-btn" ><img src="assets/icons/icon-angle-left.svg"/></button>
          <button class="js-next-btn" ><img src="assets/icons/icon-angle-right.svg"/></button>
      </div> 
        </div>

        <div class="hero__content js-content"></div>
        
  

    </div>
    `;
  }

  function cacheDOM() {
    elements.track = container.querySelector(".js-track");
    elements.content = container.querySelector(".js-content");
    elements.next = container.querySelector(".js-next-btn");
    elements.prev = container.querySelector(".js-prev-btn");
    elements.slides = container.querySelectorAll(".js-hero__slide");
  }

  function setContent() {
    const s = slides[index];

    elements.content.innerHTML = `
 
        <h1>${s.title}</h1>
        <p>${s.desc}</p>

        <div class="hero__shop-now">
          <span>Shop now</span>
          <img src="assets/icons/icon-arrow.svg" alt="arrow"/>
        </div>


    `;
  }

  function animateContent() {
    elements.content.style.opacity = 0;

    setTimeout(() => {
      setContent();
      elements.content.style.opacity = 1;
    }, 150);
  }

  function updateBackgrounds() {
    elements.slides.forEach((slide, i) => {
      slide.style.backgroundImage = `url('${getImage(slides[i])}')`;
    });
  }

  function goToSlide(newIndex) {
    if (isAnimating) return;

    isAnimating = true;

    index = (newIndex + slides.length) % slides.length;

    elements.track.style.transform = `translateX(-${index * 100}%)`;

    animateContent();

    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  function bindButtons() {
    elements.next.onclick = () => goToSlide(index + 1);
    elements.prev.onclick = () => goToSlide(index - 1);
  }

  function bindKeyboard() {
    elements.keyHandler = (e) => {
      if (e.key === "ArrowRight") goToSlide(index + 1);
      if (e.key === "ArrowLeft") goToSlide(index - 1);
    };

    document.addEventListener("keydown", elements.keyHandler);
  }

  function bindSwipe() {
    elements.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    elements.track.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(index + 1);
        else goToSlide(index - 1);
      }
    });
  }

  function bindResize() {
    window.addEventListener("resize", updateBackgrounds);
  }

  function unbind() {
    document.removeEventListener("keydown", elements.keyHandler);
  }

  function init() {
    preloadImages();

    render();
    cacheDOM();

    setContent();
    bindButtons();
    bindKeyboard();
    bindSwipe();
    bindResize();
  }

  function destroy() {
    unbind();
    container.innerHTML = "";
  }

  return {
    init,
    destroy,
  };
}
