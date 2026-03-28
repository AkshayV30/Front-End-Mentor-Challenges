export const FilterComponent = ({ regions, filters, onChange }) => {
  function render() {
    return `

    <!-- Search Input -->
    <input 
      class="c-input js-search"
      type="text"
      placeholder="Search for a country"
      value="${filters.search}"
      name="search_country"
    >

    <!-- Region Filter -->
    <div class="c-regionDropdown js-regionDropdownFilter">
        <button class="c-regionDropdown__trigger u-flex  u-justify-between u-items-center  js-regionDropdown__trigger">
          <span class="js-regionLabel"> 
          ${filters.region === "All" ? "Filter by Region" : filters.region}
          </span>
          <span class="c-chevron" data-direction="down" data-state="closed">
          </span>
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


  `;
  }

  function bind(root) {
    const input = root.querySelector(".js-search");
    const dropdown = root.querySelector(".js-regionDropdownFilter");

    const trigger = root.querySelector(".js-regionDropdown__trigger");
    const menu = root.querySelector(".js-regionDropdown__menu");

    const chevron = trigger?.querySelector(".c-chevron");

    if (!input || !dropdown || !trigger || !menu || !chevron) return;

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

      const isOpen = dropdown.classList.toggle("is-open");
      chevron.dataset.state = isOpen ? "open" : "closed";
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
};
