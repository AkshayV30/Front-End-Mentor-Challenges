import { initCarousel } from './carousel.js';
import { createWIPElement } from './utils.js';

/**
 * Render all project cards dynamically based on JSON data
 * @param {Array} projects - Array of project objects loaded from data.json
 */
export function renderCards(projects) {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';

  projects.forEach(({ id, title, images, link, tech, level }) => {
    // --------------------------------------------
    //  Get numeric level ID (for sorting or display)
    // --------------------------------------------
    const getLevelId = (level) => {
      switch (level.toUpperCase()) {
        case 'NEWBIE':
          return 1;
        case 'JUNIOR':
          return 2;
        case 'INTERMEDIATE':
          return 3;
        case 'ADVANCED':
          return 4;
        case 'GURU':
          return 5;
        default:
          return 6; // fallback for unknown levels
      }
    };

    const levelId = getLevelId(level);

    // --------------------------------------------
    // 🧩 Create list of technology tags
    // --------------------------------------------
    const techTags = tech
      .map((t) => `<span class="font-style font-${t.toLowerCase()}-color">${t}</span>`)
      .join(' ');

    // --------------------------------------------
    // 🖼️ Merge all images (desktop + mobile) and filter valid URLs
    // --------------------------------------------
    const allImages = [
      ...(Array.isArray(images.desktop) ? images.desktop : [images.desktop]),
      ...(Array.isArray(images.mobile) ? images.mobile : [images.mobile]),
    ].filter(Boolean);

    // --------------------------------------------
    // 🎠 Create carousel slides and fallback WIP state
    // --------------------------------------------
    const slides =
      allImages.length > 0
        ? allImages
            .map(
              (src, i) => `
          <li class="carousel__slide ${i === 0 ? 'current-slide' : ''}">
            <img class="carousel__image"
              src="${src}"
              alt="${title} view ${i + 1}"
              onerror="this.onerror=null; this.replaceWith(createWIPElement())" />
          </li>`
            )
            .join('')
        : `<li class="carousel__slide current-slide">
             <div class="wip-placeholder">🚧 Work in Progress</div>
           </li>`;

    // --------------------------------------------
    // ⚪ Create navigation dots for carousel
    // --------------------------------------------
    const indicators =
      allImages.length > 0
        ? allImages
            .map(
              (_, i) =>
                `<button class="carousel__indicator ${i === 0 ? 'current-slide' : ''}"></button>`
            )
            .join('')
        : `<button class="carousel__indicator current-slide"></button>`;

    // --------------------------------------------
    // 🧱 Construct final project card markup
    // --------------------------------------------
    const card = `
      <div class="container-sub ${level.toLowerCase()}-container-sub">
        <!-- 🔢 Project ID -->
        <h4 class="round-sticker">${String(id).padStart(2, '0')}</h4>

        <!-- 🎠 Carousel Section -->
        <div class="carousel">
          <button type="button" class="carousel__button carousel__button--left is-hidden">
            <img src="./res/img/chevron_left.svg" alt="left arrow" />
          </button>

          <div class="carousel__track-container">
            <ul class="carousel__track">${slides}</ul>
          </div>

          <button type="button" class="carousel__button carousel__button--right">
            <img src="./res/img/chevron_right.svg" alt="right arrow" />
          </button>

          <div class="carousel__nav">${indicators}</div>
        </div>

        <!-- 📜 Description + Tags -->
        <div class="container-description">
          <a href="${link}" target="_blank" rel="noopener noreferrer"
            class="my-animation-links ${level.toLowerCase()}-link">${title}</a>
          <div class="tech-tags">${techTags}</div>

          <!-- 🏷️ Level info with levelId -->
          <div class="sticker ${level.toLowerCase()}">
            <span>${levelId}</span>
            <span>${level}</span>
          </div>
        </div>
      </div>
    `;

    // --------------------------------------------
    // ➕ Append card to container
    // --------------------------------------------
    container.insertAdjacentHTML('beforeend', card);
  });

  // --------------------------------------------
  // 🎠 Initialize all carousels after rendering
  // --------------------------------------------
  initCarousel();
}
