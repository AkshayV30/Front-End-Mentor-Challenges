import { elements } from "./ui/elements.js";
import { getStoredTheme, saveTheme } from "./storage.js";

const THEMES = Object.freeze({
  dark: {
    icon: "./images/icon-sun.svg",
    hero: "./images/bg-desktop-dark.jpg",
    label: "Switch to light theme",
  },

  light: {
    icon: "./images/icon-moon.svg",
    hero: "./images/bg-desktop-light.jpg",
    label: "Switch to dark theme",
  },
});

export function initializeTheme() {
  applyTheme(getStoredTheme(), false);
}

export function toggleTheme() {
  const currentTheme = document.body.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
}

function applyTheme(theme, persist = true) {
  const selectedTheme = THEMES[theme];

  if (!selectedTheme) {
    return;
  }

  const { themeToggle, themeIcon, heroImage } = elements;

  document.body.dataset.theme = theme;

  themeIcon.src = selectedTheme.icon;
  heroImage.src = selectedTheme.hero;

  themeToggle.setAttribute("aria-label", selectedTheme.label);

  if (persist) {
    saveTheme(theme);
  }
}
