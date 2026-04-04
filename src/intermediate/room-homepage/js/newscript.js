"use strict";

/* ================================
   DOM ELEMENTS
================================ */

const leftArrow = document.getElementById("angle-arrow-left");
const rightArrow = document.getElementById("angle-arrow-right");

const track = document.querySelector(".main-hero-img__track");
const slides = [...track.children];

const textTrack = document.querySelector(".main-hero-txt__track");
const textSlides = [...textTrack.children];

/* ================================
   SLIDE SETUP
================================ */

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});

/* ================================
   STATE
================================ */

let currentIndex = 0;

/* ================================
   UI UPDATE FUNCTIONS
================================ */

function updateSlides(index) {
  /* move image slider */
  track.style.transform = `translateX(-${slides[index].style.left})`;

  /* update active image */
  slides.forEach((slide) => slide.classList.remove("active-hero"));
  slides[index].classList.add("active-hero");

  /* update text */
  textSlides.forEach((text) => text.classList.add("de-active-hero"));
  textSlides[index].classList.remove("de-active-hero");
}

/* ================================
   NAVIGATION
================================ */

function goToNext() {
  if (currentIndex === slides.length - 1) return;

  currentIndex++;

  updateSlides(currentIndex);
}

function goToPrev() {
  if (currentIndex === 0) return;

  currentIndex--;

  updateSlides(currentIndex);
}

/* ================================
   EVENTS
================================ */

rightArrow.addEventListener("click", goToNext);

leftArrow.addEventListener("click", goToPrev);
