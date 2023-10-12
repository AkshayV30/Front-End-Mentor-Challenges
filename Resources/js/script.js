"use strict";

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the class "carousel"
  const carousels = document.querySelectorAll(".carousel");

  // Function to move the carousel slide to a specific target slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`; // Move the track to the left by the width of the target slide
    currentSlide.classList.remove("current-slide"); // Remove "current-slide" class from the current slide
    targetSlide.classList.add("current-slide"); // Add "current-slide" class to the target slide
  };

  // Function to update the active dot indicator
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide"); // Remove "current-slide" class from the current dot
    targetDot.classList.add("current-slide"); // Add "current-slide" class to the target dot
  };

  // Function to show or hide carousel navigation arrows based on the target slide index and last slide index
  const hideShowArrow = (prevButton, nextButton, targetIndex, lastIndex) => {
    prevButton.classList.toggle("is-hidden", targetIndex === 0); // Hide the previous button if the target slide is the first slide
    nextButton.classList.toggle("is-hidden", targetIndex === lastIndex); // Hide the next button if the target slide is the last slide
  };

  // Loop through each carousel element
  carousels.forEach((carousel) => {
    // Select carousel elements
    const track = carousel.querySelector(".carousel__track"); // Track containing the slides
    const slides = Array.from(track.children); // Array of slide elements
    const slideWidth = slides[0].getBoundingClientRect().width; // Width of each slide
    const lastIndex = slides.length - 1; // Index of the last slide

    // Set the width and position of each slide
    slides.forEach((slide, index) => {
      slide.style.width = `${slideWidth}px`; // Set slide width
      slide.style.left = `${slideWidth * index}px`; // Position slides next to each other horizontally
    });

    // Select navigation elements within the carousel
    const nextButton = carousel.querySelector(".carousel__button--right"); // Next button
    const prevButton = carousel.querySelector(".carousel__button--left"); // Previous button
    const dotsNav = carousel.querySelector(".carousel__nav"); // Container for dot indicators
    const dots = Array.from(dotsNav.children); // Array of dot indicator elements

    // Add click event listener to the next button
    nextButton.addEventListener("click", () => {
      const currentSlide = carousel.querySelector(".current-slide"); // Currently active slide
      const nextSlide = currentSlide.nextElementSibling || slides[0]; // Next slide or first slide if it's the last slide
      const currentDot = dotsNav.querySelector(".current-slide"); // Currently active dot indicator
      const nextDot = currentDot.nextElementSibling || dots[0]; // Next dot indicator or first dot if it's the last dot
      const targetIndex = slides.findIndex((slide) => slide === nextSlide); // Index of the next slide

      // Move to the next slide, update dot indicator, and show/hide navigation arrows
      moveToSlide(track, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrow(prevButton, nextButton, targetIndex, lastIndex);
    });

    // Add click event listener to the previous button
    prevButton.addEventListener("click", () => {
      const currentSlide = carousel.querySelector(".current-slide"); // Currently active slide
      const prevSlide =
        currentSlide.previousElementSibling || slides[lastIndex]; // Previous slide or last slide if it's the first slide
      const currentDot = dotsNav.querySelector(".current-slide"); // Currently active dot indicator
      const prevDot = currentDot.previousElementSibling || dots[lastIndex]; // Previous dot indicator or last dot if it's the first dot
      const targetIndex = slides.findIndex((slide) => slide === prevSlide); // Index of the previous slide

      // Move to the previous slide, update dot indicator, and show/hide navigation arrows
      moveToSlide(track, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideShowArrow(prevButton, nextButton, targetIndex, lastIndex);
    });

    // Add click event listener to dot indicators for direct navigation
    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button"); // Clicked dot indicator element
      if (!targetDot) return; // If the click is not on a dot, exit the function

      const currentSlide = carousel.querySelector(".current-slide"); // Currently active slide
      const currentDot = dotsNav.querySelector(".current-slide"); // Currently active dot indicator
      const targetIndex = dots.findIndex((dot) => dot === targetDot); // Index of the target slide
      const targetSlide = slides[targetIndex]; // Target slide element

      // Move to the target slide, update dot indicator, and show/hide navigation arrows
      moveToSlide(track, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);
      hideShowArrow(prevButton, nextButton, targetIndex, lastIndex);
    });
  });
});
