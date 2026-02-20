const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const itemsLeft = document.getElementById("itemsLeft");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];
let currentFilter = "all";

/* ---------- ADD TASK ---------- */
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && taskInput.value.trim()) {
    tasks.push({
      id: Date.now(),
      text: taskInput.value.trim(),
      completed: false,
    });
    taskInput.value = "";
    render();
  }
});

/* ---------- RENDER ---------- */
function render() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `todo__item ${task.completed ? "completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    li.append(checkbox, span);
    taskList.appendChild(li);
  });

  updateCount();
}

/* ---------- HELPERS ---------- */
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  render();
}

function updateCount() {
  itemsLeft.textContent = tasks.filter((t) => !t.completed).length;
}

/* ---------- FILTERS ---------- */
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

/* ---------- CLEAR COMPLETED ---------- */
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  render();
});
