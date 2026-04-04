const NAV_CONFIG = {
  links: [
    { label: "Home", href: "#" },
    { label: "Shop", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  logo: "assets/logo.svg",
};

export function Navbar() {
  return `<nav class="nav js-nav" aria-label="Main navigation">

      <button 
            class="nav__toggle js-toggle"
            aria-expanded="false"
            aria-controls="nav-menu"
            aria-label="Toggle navigation"
        >
        <img src="assets/icons/icon-hamburger.svg" class="nav__icon js-open"/>
        <img src="assets/icons/icon-close.svg" class="nav__icon js-close"/>
      </button>

      ${renderLogo()}
      
      ${renderLinks("nav__list", "nav-menu")}

    </nav>
  `;
}

/*   SHARED TEMPLATE */

const renderLogo = () => `
  <img class="nav__logo" src="${NAV_CONFIG.logo}" alt="logo" />
`;

function renderLinks(className, id = "") {
  return `
    <ul class="${className}" id="${id}">
      ${NAV_CONFIG.links
        .map(
          ({ label, href }) => `
        <li class="nav__item">
          <a href="${href}" class="nav__link">${label}</a>
        </li>`,
        )
        .join("")}
    </ul>
  `;
}
/*   CONTROLLER */

export function initNav() {
  const nav = document.querySelector(".js-nav");
  if (!nav) return;

  const toggle = nav.querySelector(".js-toggle");
  const menu = nav.querySelector(".nav__list");

  let open = false;

  /*     STATE HANDLER */
  function setState(state) {
    open = state;

    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);

    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", () => setState(!open));

  // close when clicking link
  menu.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav__link")) {
      setState(false);
    }
  });

  // close on ESC (accessibility)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setState(false);
  });
}
