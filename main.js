// -----------------------------------------------------------------------------
// 📁 Main Script Entry
// -----------------------------------------------------------------------------
// ✅ PURPOSE:
// This is the main entry point for rendering all project cards on the page.
// It loads the project data, renders the cards dynamically, initializes the
// image carousel, and sets up a dropdown filter for sorting projects by level.
//
// ✅ DEPENDENCIES:
// - loadCards()     → Fetches project data (from JSON or source).
// - renderCards()   → Dynamically creates the project card elements.
// - initCarousel()  → Enables image carousel interaction for each project.
//
// ✅ INTERACTIONS:
// Listens for the DOMContentLoaded event to trigger setup,
// and attaches a 'change' listener to the dropdown menu for filtering.
//
// -----------------------------------------------------------------------------

// -----------------------------
// 🧩 Import Modules
// -----------------------------
import { loadCards } from './resources/js/loadCards.js';
import { renderCards } from './resources/js/renderCards.js';
import { initCarousel } from './resources/js/carousel.js';

// -----------------------------
// ⚡ Main App Initialization
// -----------------------------
document.addEventListener('DOMContentLoaded', async () => {
  // 1️⃣ Load project data (from JSON or another data source)
  const projects = await loadCards();

  // 2️⃣ Render all project cards to the DOM
  renderCards(projects);

  // 3️⃣ Initialize the image carousel functionality
  initCarousel();

  // -----------------------------
  // 🎚️ Dropdown Filtering Setup
  // -----------------------------
  // Get reference to the dropdown filter (must exist in HTML as #levelFilter)
  const filterSelect = document.getElementById('levelFilter');

  // When user changes dropdown value, filter displayed projects
  filterSelect.addEventListener('change', (e) => {
    const level = e.target.value;

    // If "ALL" is selected → show every project
    // Otherwise → filter by specific level
    const filtered = level === 'ALL' ? projects : projects.filter((p) => p.level === level);

    // Re-render filtered projects
    renderCards(filtered);

    // Re-initialize carousel for the newly rendered cards
    initCarousel();
  });
});
