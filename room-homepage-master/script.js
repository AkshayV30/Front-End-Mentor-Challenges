"use strict";
const leftArrow = document.getElementById("angle-arrow-left");
const rightArrow = document.getElementById("angle-arrow-right");
// console.log(leftArrow);
// console.log(rightArrow);

// for images
const track = document.querySelector(".main-hero-img__track");
const slides = Array.from(track.children);
// console.log(track);
// console.log(slides);

const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

//seting up for moving to next slide by calculating width of current slid
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * 2.2 * index + "px"; //need to be fixed REVIEW_A:
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("active-hero");
  targetSlide.classList.add("active-hero");
};

// for txt
const track_txt = document.querySelector(".main-hero-txt__track");
const txts = Array.from(track_txt.children);

// console.log(track_txt);
console.log(txts);

// txts[0].classList.remove("de-active-hero");

// txts[0].classList.add("de-active-hero");
// txts[1].classList.remove("de-active-hero");

// txts[0].classList.add("de-active-hero");
// txts[1].classList.add("de-active-hero");
// txts[2].classList.remove("de-active-hero");

const updateMainText = (targetIndex) => {
  if (targetIndex == 0) {
    txts[0].classList.remove("de-active-hero");
    txts[1].classList.add("de-active-hero");
    txts[2].classList.add("de-active-hero");
  } else if (targetIndex == 1) {
    txts[0].classList.add("de-active-hero");
    txts[1].classList.remove("de-active-hero");
    txts[2].classList.add("de-active-hero");
  } else if (targetIndex == 2) {
    txts[0].classList.add("de-active-hero");
    txts[1].classList.add("de-active-hero");
    txts[2].classList.remove("de-active-hero");
  }
};

// next button
rightArrow.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".active-hero");
  console.log(currentSlide);

  const nextSlide = currentSlide.nextElementSibling;

  const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  if (nextIndex < 0) return; //to exit function for negative value REVIEW_B:
  console.log(nextIndex);

  // move to next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateMainText(nextIndex);
});

// prev button
leftArrow.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".active-hero");
  console.log(currentSlide);

  const prevSlide = currentSlide.previousElementSibling;

  const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  if (prevIndex < 0) return; //to exit function for negative value REVIEW_B:
  console.log(prevIndex);

  // move to next slide
  moveToSlide(track, currentSlide, prevSlide);
  updateMainText(prevIndex);
});
