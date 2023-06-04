console.log("hello");

const carouselSub = document.querySelector(".carousel-sub");
const carouselSlides = Array.from(carouselSub.children);

const carouselDots = document.querySelector(".carousel-dots");
const cDots = Array.from(carouselDots.children);

// slding

carouselDots.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  const currentDot = carouselDots.querySelector(".active-dot");

  const currentSlide = carouselSub.querySelector(".active-slide");

  if (!targetDot) return;

  //   changing dots actvity
  currentDot.classList.remove("active-dot");
  targetDot.classList.add("active-dot");

  //changing to next slide
  const targetIndex = cDots.findIndex((dot) => dot === targetDot);
  const targetSlide = carouselSlides[targetIndex];

  currentSlide.classList.remove("active-slide");
  targetSlide.classList.add("active-slide");

  //   console.log(targetIndex);

  //   console.log(targetSlide);
});
