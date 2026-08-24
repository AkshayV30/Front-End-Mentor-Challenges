import { createAppTemplate } from "./template.js";
import { createTodoItem } from "./todo-item.js";

export function renderApp() {
  const app = document.querySelector("#app");

  if (!app) {
    throw new Error("Todo app: #app root element was not found.");
  }

  app.innerHTML = createAppTemplate();
}

export function renderTasks(tasks) {
  const taskList = document.querySelector("#taskList");

  if (!taskList) {
    throw new Error("Todo app: task list was not found.");
  }

  taskList.replaceChildren(...tasks.map(createTodoItem));
}

export function updateItemsLeft(count) {
  const output = document.querySelector("#itemsLeft");

  if (!output) {
    return;
  }

  output.textContent = String(count);
}
