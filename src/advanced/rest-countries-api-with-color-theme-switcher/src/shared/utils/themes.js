const THEMES = {
  light: {
    label: "Dark Mode",
    icon: "../../advanced/rest-countries-api-with-color-theme-switcher/src/assets/sun.png",
  },
  dark: {
    label: "Light Mode",
    icon: "../../advanced/rest-countries-api-with-color-theme-switcher/src/assets/moon.png",
  },
};
export function initThemeToggle() {
  const btn = document.querySelector(".js-theme-toggle");
  const root = document.documentElement;

  if (!btn) return;

  function setTheme(theme) {
    const { label, icon } = THEMES[theme];

    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    btn.innerHTML = `
      <img class="c-theme" src="${icon}" />
      ${label}
    `;
  }

  // init
  let currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);

  btn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(currentTheme);
  });
}
