function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Todo app: required element "${selector}" was not found.`);
  }

  return element;
}

export const elements = {
  get taskForm() {
    return getRequiredElement("#taskForm");
  },

  get taskInput() {
    return getRequiredElement("#taskInput");
  },

  get taskList() {
    return getRequiredElement("#taskList");
  },

  get itemsLeft() {
    return getRequiredElement("#itemsLeft");
  },

  get clearCompletedButton() {
    return getRequiredElement("#clearCompleted");
  },

  get themeToggle() {
    return getRequiredElement("#themeToggle");
  },

  get themeIcon() {
    return getRequiredElement("#themeIcon");
  },

  get heroImage() {
    return getRequiredElement("#heroImage");
  },

  get filterButtons() {
    return document.querySelectorAll("[data-filter]");
  },
};
