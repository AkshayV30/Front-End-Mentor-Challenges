import { navigate } from "../router.js";

const NAV_ITEMS = [
  { page: "home", label: "Home" },
  { page: "destination", label: "Destination" },
  { page: "crew", label: "Crew" },
  { page: "technology", label: "Technology" },
];
export function renderHeader() {
  const header = document.querySelector(".c-header");

  header.innerHTML = `
    <img src="./res/assets/shared/logo.svg" class="c-logo" />

    <nav class="c-nav">
      <ol class="c-nav__list">
      ${NAV_ITEMS.map(
        (item, index) => `
          <li 
            data-page="${item.page}" 
            class="c-nav__item js-nav ${index === 0 ? "is-active" : ""}">
            
            <span class="c-nav__index">
              ${String(index).padStart(2, "0")}
            </span>

            <span class="c-nav__nav-heading">
              ${item.label}
            </span>

          </li>
        `,
      ).join("")}
      </ol>
    </nav>
  `;

  header.addEventListener("click", (e) => {
    const item = e.target.closest(".js-nav");
    if (!item) return;

    header
      .querySelectorAll(".js-nav")
      .forEach((el) => el.classList.remove("is-active"));

    item.classList.add("is-active");

    navigate(item.dataset.page);
  });
}
