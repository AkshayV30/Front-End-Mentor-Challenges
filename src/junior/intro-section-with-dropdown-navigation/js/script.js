"use strict";

// alert("hello");

document.addEventListener("DOMContentLoaded", () => {
  // const containerNav = document.querySelector(".container-nav");

  const dropDowns = document.querySelector(".dropDowns");
  const drops = document.querySelectorAll(".dropDown");
  const navCheck = document.querySelector(".nav-checkbox");

  const btnContainer = document.querySelector(".btn-container");

  drops.forEach((d) => {
    const dropDownHeading = d.querySelector(".dropDown-heading");
    const dropDownOptions = d.querySelector(".dropDown-options");
    const arrows = d.querySelector(".arrows");

    dropDownHeading.addEventListener("click", () => {
      dropDownOptions.classList.toggle("dropDown-options-visible");

      arrows.classList.toggle("arrow-up");
      arrows.classList.toggle("arrow-down");
      // console.log(e.key);

      if (window.matchMedia("(max-width: 720px)").matches) {
        // console.log(dropDownOptions);
        // dropdownOptions.classList.toggle("dropDown-options-open");
        if (dropDownOptions.classList.contains("dropDown-option-1")) {
          drops[1].classList.toggle("dropDown-spacing-1");
          // console.log("drops-1", drops[0]);
        }
        if (dropDownOptions.classList.contains("dropDown-option-2")) {
          drops[2].classList.toggle("dropDown-spacing-2");
          // console.log("drops-2");
        }
      }
    });
  });

  navCheck.addEventListener("click", () => {
    // console.log("hi", dropDowns);

    // dropDowns.style.display = "inline-flex";
    dropDowns.classList.toggle("dropDowns-visible");
    btnContainer.classList.toggle("btn-container-visible");
    document.body.classList.toggle("background-blur-effect");
  });
});
