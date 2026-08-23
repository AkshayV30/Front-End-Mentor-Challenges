const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeStylesheet = document.getElementById("themeStylesheet");
const heroImage = document.getElementById("heroImage");

const THEMES = {
  dark: {
    stylesheet: "./res/css/dark-theme.css",
    icon: "./images/icon-sun.svg",
    hero: "./images/bg-desktop-dark.jpg",
    label: "Switch to light theme",
  },

  light: {
    stylesheet: "./res/css/light-theme.css",
    icon: "./images/icon-moon.svg",
    hero: "./images/bg-desktop-light.jpg",
    label: "Switch to dark theme",
  },
};

/* 
   APPLY THEME
 */

function applyTheme(theme) {
  const selectedTheme = THEMES[theme];

  if (!selectedTheme) return;

  document.body.className = `theme-${theme}`;

  themeStylesheet.href = selectedTheme.stylesheet;
  themeIcon.src = selectedTheme.icon;
  heroImage.src = selectedTheme.hero;

  themeToggle.setAttribute("aria-label", selectedTheme.label);

  saveTheme(theme);
}

/* 
   TOGGLE THEME
 */

function toggleTheme() {
  const currentTheme = document.body.classList.contains("theme-dark")
    ? "dark"
    : "light";

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
}

/* 
   INITIALIZE THEME
 */

function initializeTheme() {
  const savedTheme = getStoredTheme();

  applyTheme(savedTheme === "light" ? "light" : "dark");
}
