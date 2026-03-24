let currentPage = null;

export function mount(pageFn) {
  currentPage = pageFn;
  render();
}

export function render() {
  if (currentPage) currentPage();
}
