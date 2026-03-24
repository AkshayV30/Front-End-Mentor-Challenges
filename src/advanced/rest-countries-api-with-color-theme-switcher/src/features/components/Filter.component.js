export function FilterComponent({ regions, filters, onChange }) {
  function render() {
    return `
  <div class="l-filters u-flex u-items-center u-justify-between">

    <!-- Search Input -->
    <input 
      class="c-input js-search"
      type="text"
      placeholder="Search for a country"
      value="${filters.search}"
    >

    <!-- Region Filter -->
    <div class="c-regionDropdown js-regionDropdownFilter">
        <button class="c-regionDropdown__trigger js-regionDropdown__trigger">
          <span class="js-regionLabel"> 
          ${filters.region === "All" ? "Filter by Region" : filters.region}
          </span>
          <span class="c-regionDropdown__arrow"></span>
        </button>

        <div class="c-regionDropdown__menu js-regionDropdown__menu">
          <button data-value="All" class="c-regionDropdown__item" >All</button>
          ${regions
            .map(
              (r) =>
                `<button data-value="${r}" class="c-regionDropdown__item" >${r}</button>`,
            )
            .join("")}
        </div>

    </div>

  </div>
  `;
  }

  function bind(root) {
    const input = root.querySelector(".js-search");
    const dropdown = root.querySelector(".js-regionDropdownFilter");

    const trigger = root.querySelector(".js-regionDropdown__trigger");
    const menu = root.querySelector(".js-regionDropdown__menu");

    if (!input || !dropdown || !trigger || !menu) return;

    let debounce;

    input.addEventListener("input", (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        onChange({
          search: e.target.value,
        });
      }, 300);
    });

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("is-open");
    });

    menu.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const btnValue = btn.dataset.value;

      const label = root.querySelector(".js-regionLabel");

      if (label) {
        label.textContent = btnValue === "All" ? "Filter by Region" : btnValue;
      }

      dropdown.classList.remove("is-open");
      onChange({ region: btnValue });
    });

    if (!document.body.dataset.dropdownListener) {
      document.addEventListener("click", (e) => {
        document.querySelectorAll(".js-regionDropdownFilter").forEach((dd) => {
          if (!dd.contains(e.target)) {
            dd.classList.remove("is-open");
          }
        });
      });
    }
    document.body.dataset.dropdownListener = "true";
  }
  return { render, bind };
}
