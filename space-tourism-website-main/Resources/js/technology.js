console.log("hello");

// const technologySubContainer = document.querySelector(
//   ".technology-sub-container"
// );
// const technologySub = Array.from(technologySubContainer.children);

const navNumbers = document.querySelector(".nav-numbers");
const btnNumber = Array.from(navNumbers.children);
// console.log(btnNumber);

const technologyDescription = document.querySelector(".technology-description");
const technologyText = Array.from(technologyDescription.children);

const technologyImages = document.querySelector(".technology-images");
const technologyImg = Array.from(technologyImages.children);

// slding

navNumbers.addEventListener("click", (e) => {
  const targetNumber = e.target.closest("button");

  const currentNumber = navNumbers.querySelector(".active-number");
  const currentDescription = technologyDescription.querySelector(".active-txt");
  const currentImage = technologyImages.querySelector(".active-img");

  if (!targetNumber) return;

  //   console.log(targetNumber);

  //   changing number actvity
  currentNumber.classList.remove("active-number");
  targetNumber.classList.add("active-number");

  //changing to next description
  const targetIndex = btnNumber.findIndex((dot) => dot === targetNumber);
  const targetDescription = technologyText[targetIndex];

  currentDescription.classList.remove("active-txt");
  targetDescription.classList.add("active-txt");

  //   console.log(targetIndex);

  // changing images
  const targetImage = technologyImg[targetIndex];

  currentImage.classList.remove("active-img");
  targetImage.classList.add("active-img");

  //   console.log(targetSlide);
});
