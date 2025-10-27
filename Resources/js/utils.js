// -------------------------------------------------------------
// 🧱 createWIPElement()
// -------------------------------------------------------------
// ✅ PURPOSE:
// Creates and returns a "Work in Progress" (WIP) placeholder element.
// This element is shown whenever an image fails to load or
// when no preview images are available for a project.
//
// ✅ USAGE CONTEXT:
// Used in renderCards() inside the carousel to gracefully handle
// missing image sources by displaying a visual placeholder.
//
// ✅ RETURNS:
// <div class="wip-placeholder">🚧 Work in Progress</div>
//
// -------------------------------------------------------------

export function createWIPElement() {
  // Create a <div> element dynamically
  const div = document.createElement('div');

  // Add a custom CSS class for styling
  div.classList.add('wip-placeholder');

  // Display a clear message that the project is still incomplete
  div.textContent = '🚧 Work in Progress';

  // Return the ready-to-insert element
  return div;
}
