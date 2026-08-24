export function createAppTemplate() {
  return `
    <header class="hero" aria-hidden="true">
      <img
        class="hero__image"
        id="heroImage"
        src="./images/bg-desktop-dark.jpg"
        alt=""
        width="1440"
        height="300"
      />
    </header>

    <main class="container">
      <section
        class="todo"
        aria-labelledby="todo-title"
      >

        ${createTodoHeader()}

        ${createTodoForm()}

        ${createTodoList()}

        <p class="todo__hint">
          Drag and drop to reorder list
        </p>

      </section>
    </main>

    ${createSiteFooter()}
  `;
}

function createTodoHeader() {
  return `
    <header class="todo__header">

      <h1 class="todo__title" id="todo-title">
        TODO
      </h1>

      <button
        id="themeToggle"
        class="todo__theme-btn"
        type="button"
        aria-label="Switch to light theme"
      >
        <img
          id="themeIcon"
          src="./images/icon-sun.svg"
          alt=""
          width="20"
          height="20"
        />
      </button>

    </header>
  `;
}

function createTodoForm() {
  return `
    <form
      class="todo__form"
      id="taskForm"
    >


      <input
        class="todo__input"
        id="taskInput"
        name="task"
        type="text"
        placeholder="Create a new task"
        maxlength="100"
        autocomplete="off"
        required
      />
    </form>
  `;
}

function createTodoList() {
  return `
    <section
      class="todo__list-wrapper"
      aria-label="Todo list"
    >

      <ul
        class="todo__list"
        id="taskList"
        aria-live="polite"
        aria-relevant="additions removals"
      ></ul>

      ${createTodoFooter()}

    </section>
  `;
}

function createTodoFooter() {
  return `
    <div class="todo__footer">

      <p class="todo__count">
        <output
          id="itemsLeft"
          aria-live="polite"
        >0</output>

        <span>items left</span>
      </p>

      <div
        class="todo__filters"
        aria-label="Filter tasks"
      >
        <div role="group" aria-label="Task filters">

          <button
            type="button"
            data-filter="all"
            class="is-active"
            aria-current="page"
          >
            All
          </button>

          <button
            type="button"
            data-filter="active"
            aria-current="false"
          >
            Active
          </button>

          <button
            type="button"
            data-filter="completed"
            aria-current="false"
          >
            Completed
          </button>

        </div>
      </div>

      <button
        class="todo__clear"
        id="clearCompleted"
        type="button"
      >
        Clear Completed
      </button>

    </div>
  `;
}

function createSiteFooter() {
  return `
    <footer class="site-footer">

      <p class="attribution">
        Challenge by

        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend Mentor
        </a>.

        Coded by
        <a href="#">
          AkshayV30
        </a>.
      </p>

    </footer>
  `;
}
