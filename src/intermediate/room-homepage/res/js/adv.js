"use strict";

/* ========================================
   SLIDER COMPONENT
======================================== */

class HeroSlider {
  constructor({ trackSelector, textSelector, prevBtn, nextBtn }) {
    /* ---------- DOM Elements ---------- */

    this.track = document.querySelector(trackSelector);
    this.slides = [...this.track.children];

    this.textTrack = document.querySelector(textSelector);
    this.textSlides = [...this.textTrack.children];

    this.prevBtn = document.querySelector(prevBtn);
    this.nextBtn = document.querySelector(nextBtn);

    /* ---------- State ---------- */

    this.currentIndex = 0;
    this.slideWidth = 0;

    /* ---------- Initialize ---------- */

    this.init();
  }

  /* ========================================
     INITIALIZATION
  ======================================== */

  init() {
    this.calculateWidth();
    this.positionSlides();
    this.bindEvents();
  }

  /* ========================================
     CALCULATE SLIDE WIDTH
  ======================================== */

  calculateWidth() {
    this.slideWidth = this.slides[0].getBoundingClientRect().width;
  }

  /* ========================================
     POSITION SLIDES
  ======================================== */

  positionSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.left = `${this.slideWidth * index}px`;
    });
  }

  /* ========================================
     UPDATE UI
  ======================================== */

  updateUI() {
    const targetSlide = this.slides[this.currentIndex];

    /* move image slider */

    this.track.style.transform = `translateX(-${targetSlide.style.left})`;

    /* update active slide */

    this.slides.forEach((slide) => slide.classList.remove("active-hero"));

    targetSlide.classList.add("active-hero");

    /* update text */

    this.textSlides.forEach((text) => text.classList.add("de-active-hero"));

    this.textSlides[this.currentIndex].classList.remove("de-active-hero");
  }

  /* ========================================
     NAVIGATION
  ======================================== */

  next() {
    if (this.currentIndex >= this.slides.length - 1) return;

    this.currentIndex++;
    this.updateUI();
  }

  prev() {
    if (this.currentIndex <= 0) return;

    this.currentIndex--;
    this.updateUI();
  }

  /* ========================================
     EVENT HANDLERS
  ======================================== */

  bindEvents() {
    this.nextBtn.addEventListener("click", () => this.next());

    this.prevBtn.addEventListener("click", () => this.prev());

    /* keyboard navigation */

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.next();

      if (e.key === "ArrowLeft") this.prev();
    });

    /* responsive resize */

    window.addEventListener("resize", () => {
      this.calculateWidth();
      this.positionSlides();
      this.updateUI();
    });
  }
}

/* ========================================
   CREATE SLIDER INSTANCE
======================================== */

new HeroSlider({
  trackSelector: ".main-hero-img__track",
  textSelector: ".main-hero-txt__track",
  prevBtn: "#angle-arrow-left",
  nextBtn: "#angle-arrow-right",
});
