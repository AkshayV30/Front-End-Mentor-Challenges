import { contentsContainer } from '../main.js';
import { renderMain } from '../main.js';

export function renderHome() {
  contentsContainer.innerHTML = `
    <section class="section-home fade-in">
      <div class="home-text">
        <h2>So, you want to travel to</h2>
        <h1>SPACE</h1>
        <p class="home-text-para">
          Let’s face it: if you want to go to space, you might as well go to outer space
          and not just hover at the edge of it. Sit back, relax, and we’ll give you a truly
          out-of-this-world experience!
        </p>
      </div>
      <button id="btn-explore" class="btn-primary-explore pulse-animation">Explore</button>
    </section>
  `;

  document.getElementById('btn-explore').addEventListener('click', () => {
    renderMain('destination');
  });
}
