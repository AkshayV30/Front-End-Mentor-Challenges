let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const itemsLeft = document.getElementById("itemsLeft");
const clearCompletedBtn = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll("[data-filter]");

if (!taskInput || !taskList || !itemsLeft || !clearCompletedBtn) {
  throw new Error("Todo app: required HTML elements are missing.");
}
/* 
   INITIALIZE
 */

function initializeTodos() {
  tasks = getStoredTasks();

  renderTasks();
}

/* 
   ADD TASK
 */

function addTask() {
  const text = taskInput.value.trim();

  if (!text) return;

  const task = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };

  tasks.push(task);

  saveTasks(tasks);
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

/* 
   TOGGLE TASK
 */

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id !== id) return task;

    return {
      ...task,
      completed: !task.completed,
    };
  });

  saveTasks(tasks);
  renderTasks();
}

/* 
   DELETE TASK
 */

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks(tasks);
  renderTasks();
}

/* 
   FILTER TASKS
 */

function getFilteredTasks() {
  switch (currentFilter) {
    case "active":
      return tasks.filter((task) => !task.completed);

    case "completed":
      return tasks.filter((task) => task.completed);

    default:
      return tasks;
  }
}

/* 
   RENDER
 */

function renderTasks() {
  const filteredTasks = getFilteredTasks();

  taskList.innerHTML = filteredTasks.map(createTaskHTML).join("");

  updateItemsLeft();
}

/* 
   CREATE TASK HTML
 */

function createTaskHTML(task) {
  return `
    <li
      class="todo__item ${task.completed ? "is-completed" : ""}"
      data-id="${task.id}"
    >
      <button
        class="todo__checkbox"
        type="button"
        data-action="toggle"
        aria-label="${
          task.completed ? "Mark task as active" : "Mark task as completed"
        }"
        aria-pressed="${task.completed}"
      >
        ${task.completed ? "✓" : ""}
      </button>

      <span class="todo__text">
        ${escapeHTML(task.text)}
      </span>

      <button
        class="todo__delete"
        type="button"
        data-action="delete"
        aria-label="Delete ${escapeHTML(task.text)}"
      >
        ×
      </button>
    </li>
  `;
}

/* 
   EVENT DELEGATION
 */

function handleTaskListClick(event) {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) return;

  const taskItem = actionButton.closest(".todo__item");

  if (!taskItem) return;

  const taskId = taskItem.dataset.id;
  const action = actionButton.dataset.action;

  if (action === "toggle") {
    toggleTask(taskId);
  }

  if (action === "delete") {
    deleteTask(taskId);
  }
}

/* 
   UPDATE COUNT
 */

function updateItemsLeft() {
  const activeTasks = tasks.filter((task) => !task.completed);

  itemsLeft.textContent = activeTasks.length;
}

/* 
   FILTER BUTTONS
 */

function handleFilterChange(event) {
  const button = event.currentTarget;

  currentFilter = button.dataset.filter;

  filterButtons.forEach((filterButton) => {
    filterButton.classList.toggle("is-active", filterButton === button);
  });

  renderTasks();
}

/* 
   CLEAR COMPLETED
 */

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks(tasks);
  renderTasks();
}

/* 
   HTML ESCAPE
 */

function escapeHTML(text) {
  const element = document.createElement("div");

  element.textContent = text;

  return element.innerHTML;
}
