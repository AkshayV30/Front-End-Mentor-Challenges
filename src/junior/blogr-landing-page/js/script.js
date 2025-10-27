// // alert("hello");
"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const dropDowns = document.querySelector(".dropDowns");
  const drops = document.querySelectorAll(".dropDown");
  const btnRight = document.querySelector(".button-right");
  const navCheck = document.querySelector(".nav-checkbox");
  const container = document.querySelector(".container-section--1");

  drops.forEach((d) => {
    const optionsToSelect = d.querySelector(".optionsToSelect");
    const materialArrow = d.querySelector(".material-symbols-outlined");
    const dropdownOptions = d.querySelector(".dropDown-options");
    const options = d.querySelectorAll(".dropDown-options li");
    const selected = d.querySelector(".mySelection");

    optionsToSelect.addEventListener("click", () => {
      dropdownOptions.classList.toggle("dropDown-options-open");

      if (dropdownOptions.classList.contains("dropDown-options-open")) {
        materialArrow.textContent = "expand_less";
      } else {
        materialArrow.textContent = "expand_more";
      }

      if (window.matchMedia("(max-width: 720px)").matches) {
        // dropdownOptions.classList.toggle("dropDown-options-open");
        if (d.classList.contains("drop-0")) {
          drops[1].classList.toggle("dropDown-spacing-1");
        }
        if (d.classList.contains("drop-1")) {
          drops[2].classList.toggle("dropDown-spacing-2");
        }
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerText = option.innerText;
        dropdownOptions.classList.remove("dropDown-options-open");

        options.forEach((item) => {
          item.classList.remove("activeSelection");
        });

        option.classList.add("activeSelection");

        materialArrow.textContent = "expand_more";

        if (window.matchMedia("(max-width: 720px)").matches) {
          // dropdownOptions.classList.toggle("dropDown-options-open");
          if (d.classList.contains("drop-0")) {
            drops[1].classList.remove("dropDown-spacing-1");
          }
          if (d.classList.contains("drop-1")) {
            drops[2].classList.remove("dropDown-spacing-2");
          }
        }
      });
    });
  });

  // console.log(container);

  navCheck.addEventListener("click", () => {
    dropDowns.classList.toggle("dropDowns-visible");
    btnRight.classList.toggle("button-right-visible");
    container.classList.toggle("container-section--1-position");
  });
});
