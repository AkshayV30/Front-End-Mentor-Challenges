import {
  initializeTodos,
  addTask,
  toggleTask,
  deleteTask,
  handleFilterChange,
  clearCompleted,
  startDrag,
  handleDragOver,
  handleDrop,
  endDrag,
} from "./todos.js";

import { initializeTheme, toggleTheme } from "./theme.js";
import { renderApp } from "./ui/render.js";
import { elements } from "./ui/elements.js";

export function initializeApp() {
  renderApp();

  initializeTodos();
  initializeTheme();

  bindEvents();
}

function bindEvents() {
  const {
    taskForm,
    taskList,
    themeToggle,
    clearCompletedButton,
    filterButtons,
  } = elements;

  taskForm.addEventListener("submit", handleTaskSubmit);
  taskList.addEventListener("click", handleTaskListClick);

  clearCompletedButton.addEventListener("click", clearCompleted);

  taskList.addEventListener("dragstart", startDrag);
  taskList.addEventListener("dragover", handleDragOver);
  taskList.addEventListener("drop", handleDrop);
  taskList.addEventListener("dragend", endDrag);

  filterButtons.forEach((button) => {
    button.addEventListener("click", handleFilterChange);
  });

  themeToggle.addEventListener("click", toggleTheme);
}

function handleTaskSubmit(event) {
  event.preventDefault();
  addTask();
}

function handleTaskListClick(event) {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton || !elements.taskList.contains(actionButton)) {
    return;
  }

  const taskItem = actionButton.closest(".todo__item");

  if (!taskItem) {
    return;
  }

  const { id } = taskItem.dataset;
  const { action } = actionButton.dataset;

  const actions = {
    toggle: toggleTask,
    delete: deleteTask,
  };

  actions[action]?.(id);
}
