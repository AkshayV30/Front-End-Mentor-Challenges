/* 
   TODO INPUT
 */

taskInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  addTask();
});

/* 
   TODO LIST
 */

taskList.addEventListener("click", handleTaskListClick);

/* 
   FILTERS
 */

filterButtons.forEach((button) => {
  button.addEventListener("click", handleFilterChange);
});

/* 
   CLEAR COMPLETED
 */

clearCompletedBtn.addEventListener("click", clearCompleted);

/* 
   THEME
 */

themeToggle.addEventListener("click", toggleTheme);

/* 
   START APPLICATION
 */

initializeTodos();
initializeTheme();
