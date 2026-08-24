const STORAGE_KEYS = Object.freeze({
  tasks: "todo-tasks",
  theme: "todo-theme",
});

const VALID_THEMES = new Set(["dark", "light"]);

const DEFAULT_THEME = "dark";

/* TASKS                                                                      */

export function getStoredTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.tasks);

    if (!stored) {
      return [];
    }

    const tasks = JSON.parse(stored);

    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error("Unable to load stored tasks:", error);

    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  } catch (error) {
    console.error("Unable to save tasks:", error);
  }
}

/* THEME                                                                      */

export function getStoredTheme() {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.theme);

    return VALID_THEMES.has(theme) ? theme : DEFAULT_THEME;
  } catch (error) {
    console.error("Unable to load stored theme:", error);

    return DEFAULT_THEME;
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  } catch (error) {
    console.error("Unable to save theme:", error);
  }
}
