import { getStoredTasks, saveTasks } from "./storage.js";
import { renderTasks, updateItemsLeft } from "./ui/render.js";

let tasks = [];
let currentFilter = "all";
let draggedTaskId = null;

export function initializeTodos() {
  tasks = getStoredTasks();
  render();
}

export function addTask() {
  const input = document.querySelector("#taskInput");
  const form = document.querySelector("#taskForm");

  const text = input?.value.trim();

  if (!text) {
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });

  persist();
  render();

  form.reset();
  input.focus();
}

export function toggleTask(id) {
  updateTask(id, (task) => ({
    ...task,
    completed: !task.completed,
  }));
}

export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  persist();
  render();
}

function updateTask(id, updater) {
  tasks = tasks.map((task) => (task.id === id ? updater(task) : task));

  persist();
  render();
}

export function handleFilterChange(event) {
  const button = event.currentTarget;
  const filter = button.dataset.filter;

  if (!filter) {
    return;
  }

  currentFilter = filter;
  updateFilterButtons();
  render();
}

function updateFilterButtons() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

export function clearCompleted() {
  const remainingTasks = tasks.filter((task) => !task.completed);

  if (remainingTasks.length === tasks.length) {
    return;
  }

  tasks = remainingTasks;

  persist();
  render();
}

/* Drag and drop */

export function startDrag(event) {
  const item = event.target.closest(".todo__item");

  if (!item) {
    return;
  }

  draggedTaskId = item.dataset.id;

  item.classList.add("is-dragging");

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedTaskId);
}

export function handleDragOver(event) {
  event.preventDefault();

  const target = event.target.closest(".todo__item");

  if (!target || target.dataset.id === draggedTaskId) {
    return;
  }

  event.dataTransfer.dropEffect = "move";

  clearDragIndicators();

  target.classList.add("is-drag-over");
}

export function handleDrop(event) {
  event.preventDefault();

  const target = event.target.closest(".todo__item");

  if (!target || !draggedTaskId) {
    return;
  }

  const targetId = target.dataset.id;

  if (draggedTaskId !== targetId) {
    reorderTasks(draggedTaskId, targetId);
  }
}

export function endDrag(event) {
  event.target.closest(".todo__item")?.classList.remove("is-dragging");

  clearDragIndicators();
  draggedTaskId = null;
}

function reorderTasks(draggedId, targetId) {
  const visibleTasks = getFilteredTasks();

  const draggedIndex = visibleTasks.findIndex((task) => task.id === draggedId);

  const targetIndex = visibleTasks.findIndex((task) => task.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1) {
    return;
  }

  const reordered = [...visibleTasks];
  const [draggedTask] = reordered.splice(draggedIndex, 1);

  reordered.splice(targetIndex, 0, draggedTask);

  const visibleIds = new Set(visibleTasks.map((task) => task.id));

  let index = 0;

  tasks = tasks.map((task) =>
    visibleIds.has(task.id) ? reordered[index++] : task,
  );

  persist();
  render();
}

function clearDragIndicators() {
  document.querySelectorAll(".todo__item.is-drag-over").forEach((item) => {
    item.classList.remove("is-drag-over");
  });
}

/* Filtering */

function getFilteredTasks() {
  const filters = {
    all: () => tasks,
    active: () => tasks.filter((task) => !task.completed),
    completed: () => tasks.filter((task) => task.completed),
  };

  return (filters[currentFilter] ?? filters.all)();
}

/* Rendering */

function render() {
  const visibleTasks = getFilteredTasks();

  renderTasks(visibleTasks);

  const activeCount = tasks.filter((task) => !task.completed).length;

  updateItemsLeft(activeCount);
}

/* Persistence */

function persist() {
  saveTasks(tasks);
}
