export function filterUI(regions) {
  console.log(regions);
  return `

  <div class="controls">

      <input 
        id="searchInput"
        placeholder="Search for a country"
      >

      <select id="regionFilter">

          <option value="All">All</option>

          ${regions.map((r) => `<option value="${r}">${r}</option>`).join("")}

      </select>

  </div>

  `;
}
