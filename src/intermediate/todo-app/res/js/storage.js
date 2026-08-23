const STORAGE_KEYS = {
  tasks: "todo-tasks",
  theme: "todo-theme",
};

function getStoredTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks)) || [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
}

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEYS.theme) || "dark";
}

function saveTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}
