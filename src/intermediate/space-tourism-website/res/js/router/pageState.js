export function setPageState(page) {
  const body = document.body;

  [...body.classList]
    .filter((cls) => cls.startsWith("page-"))
    .forEach((cls) => body.classList.remove(cls));

  body.classList.add(`page-${page}`);
}
