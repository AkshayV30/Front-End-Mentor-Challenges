import { Navbar, initNav } from "./components/Navbar.js";
import { About } from "./components/About.js";
import { createSlider } from "./components/Slider.js";

const root = document.getElementById("root");

function renderLayout() {
  root.innerHTML = `
    ${Navbar()}
    <section class="hero-container js-slider"></section>
    ${About()}
  `;
}

function init() {
  renderLayout();

  const sliderContainer = document.querySelector(".js-slider");

  const slider = createSlider(sliderContainer);
  slider.init();

  initNav();
}

init();
