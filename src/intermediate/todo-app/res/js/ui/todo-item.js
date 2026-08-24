export function createTodoItem(task) {
  const item = document.createElement("li");

  item.className = "todo__item";
  item.dataset.id = task.id;
  item.draggable = true;

  if (task.completed) {
    item.classList.add("is-completed");
  }

  item.append(
    createToggleButton(task),
    createTaskText(task),
    createDeleteButton(task),
  );

  return item;
}

export function createToggleButton(task) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "todo__checkbox";
  button.dataset.action = "toggle";

  button.setAttribute(
    "aria-label",
    task.completed ? "Mark task as active" : "Mark task as completed",
  );

  button.setAttribute("aria-pressed", String(task.completed));

  if (task.completed) {
    button.textContent = "✓";
  }

  return button;
}

export function createTaskText(task) {
  const text = document.createElement("span");

  text.className = "todo__text";
  text.textContent = task.text;

  return text;
}

export function createDeleteButton(task) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "todo__delete";
  button.dataset.action = "delete";
  button.setAttribute("aria-label", `Delete ${task.text}`);
  button.textContent = "×";

  return button;
}
