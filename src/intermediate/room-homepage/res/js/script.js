"use strict";

/* ======================================
   1. GET BUTTON ELEMENTS
====================================== */

const leftArrow = document.getElementById("angle-arrow-left");
const rightArrow = document.getElementById("angle-arrow-right");

/* ======================================
   2. IMAGE SLIDER SETUP
====================================== */

// Select the slider track that holds all images
const track = document.querySelector(".main-hero-img__track");

// Convert HTMLCollection to array for easier manipulation
const slides = Array.from(track.children);

// Get width of one slide (used to calculate movement)
const slideWidth = slides[0].getBoundingClientRect().width;

/* ======================================
   3. POSITION EACH SLIDE NEXT TO EACH OTHER
====================================== */

// This function places slides horizontally
const setSlidePosition = (slide, index) => {
  // Each slide moves to the right based on its index
  // Example:
  // slide 0 -> 0px
  // slide 1 -> slideWidth
  // slide 2 -> slideWidth * 2

  slide.style.left = slideWidth * index + "px";
};

// Apply position to all slides
slides.forEach(setSlidePosition);

/* ======================================
   4. FUNCTION TO MOVE SLIDER
====================================== */

const moveToSlide = (track, currentSlide, targetSlide) => {
  // Move the slider track to show target slide
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";

  // Update active slide class
  currentSlide.classList.remove("active-hero");
  targetSlide.classList.add("active-hero");
};

/* ======================================
   5. TEXT CONTENT SETUP
====================================== */

// Select the text container
const track_txt = document.querySelector(".main-hero-txt__track");

// Convert children to array
const txts = Array.from(track_txt.children);

/* ======================================
   6. FUNCTION TO UPDATE TEXT CONTENT
====================================== */

const updateMainText = (targetIndex) => {
  // Hide all text slides first
  txts.forEach((txt) => {
    txt.classList.add("de-active-hero");
  });

  // Show the correct text slide
  txts[targetIndex].classList.remove("de-active-hero");
};

/* ======================================
   7. NEXT BUTTON CLICK
====================================== */

rightArrow.addEventListener("click", () => {
  // Find the currently active slide
  const currentSlide = track.querySelector(".active-hero");

  // Get next slide
  const nextSlide = currentSlide.nextElementSibling;

  // If there is no next slide, stop
  if (!nextSlide) return;

  // Get index of next slide
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  // Move image slider
  moveToSlide(track, currentSlide, nextSlide);

  // Update text content
  updateMainText(nextIndex);
});

/* ======================================
   8. PREVIOUS BUTTON CLICK
====================================== */

leftArrow.addEventListener("click", () => {
  // Find current active slide
  const currentSlide = track.querySelector(".active-hero");

  // Get previous slide
  const prevSlide = currentSlide.previousElementSibling;

  // If there is no previous slide, stop
  if (!prevSlide) return;

  // Get index of previous slide
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  // Move image slider
  moveToSlide(track, currentSlide, prevSlide);

  // Update text content
  updateMainText(prevIndex);
});
