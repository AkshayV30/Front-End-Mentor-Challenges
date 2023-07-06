"use strict";

// alert("hello");

document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelectorAll(".arrow");
  //   console.log(menu);

  const dropdown__1 = document.querySelector(".dropdown--1");
  const dropdown__2 = document.querySelector(".dropdown--2");
  //   console.log(dropdown__1, dropDown__2);

  const open__1 = document.querySelectorAll(".dropdown-heading--1");
  const open__2 = document.querySelectorAll(".dropdown-heading--2");

  const showDropdown__1 = () => {
    dropdown__1.classList.remove("hidden");
  };

  const showDropdown__2 = () => {
    dropdown__2.classList.remove("hidden");
  };

  const hideDropdown__1 = () => {
    dropdown__1.classList.add("hidden");
  };

  const hideDropdown__2 = () => {
    dropdown__2.classList.add("hidden");
  };

  for (let i = 0; i < open__1.length; i++) {
    open__1[i].addEventListener("click", showDropdown__1);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dropdown__1.classList.contains("hidden")) {
      hideDropdown__1();
    }
  });

  for (let i = 0; i < open__2.length; i++) {
    open__2[i].addEventListener("click", showDropdown__2);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dropdown__2.classList.contains("hidden")) {
      hideDropdown__2();
    }
  });
});
