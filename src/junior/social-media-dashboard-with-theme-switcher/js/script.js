"use strict";
// alert("hello");

// const themeSelector = document.getElementById("rng");
// const body = document.body;

// console.log(body, themeSelector);

// themeSelector.addEventListener("change", (e) => {
//   const selectedValue = parseInt(e.target.value);

//   console.log(selectedValue);

//   const themes = ["darken", "lighten"];
//   body.classList.remove(...themes);
//   body.classList.add(themes[selectedValue]);
// });

//asyncronous way
document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("rng");
  const body = document.body;
  // console.log(body, themeSelector);

  themeSelector.addEventListener("change", (e) => {
    const selectedValue = parseInt(e.target.value);
    // console.log(selectedValue);

    const themes = ["darken", "lighten"];
    body.classList.remove(...themes);
    body.classList.add(themes[selectedValue]);
  });
});
