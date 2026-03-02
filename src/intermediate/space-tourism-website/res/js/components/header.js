import { navigate } from "../router.js";

export function renderHeader() {
  const header = document.querySelector(".c-header");

  header.innerHTML = `
    <img src="./res/assets/shared/logo.svg" class="c-logo" />

    <nav class="c-nav">
      <ol class="c-nav__list">
        <li data-page="home" class="c-nav__item is-active js-nav">
          <strong class="c-nav__index">  00 </strong>
          <span class="c-nav__nav-heading"> Home  </span>  </li>
        <li data-page="destination" class="c-nav__item js-nav">
          <strong class="c-nav__index">  01 </strong>
          <span class="c-nav__nav-heading"> Destination  </span> </li>
        <li data-page="crew" class="c-nav__item js-nav">
          <strong class="c-nav__index">  02 </strong>        
          <span class="c-nav__nav-heading"> Crew </span> </li>
        <li data-page="technology" class="c-nav__item js-nav">
          <strong class="c-nav__index">  03 </strong>
          <span class="c-nav__nav-heading">  Technology </span> </li>
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
