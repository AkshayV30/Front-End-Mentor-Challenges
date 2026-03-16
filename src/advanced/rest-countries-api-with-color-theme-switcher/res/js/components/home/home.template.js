export function homeTemplate() {
  return `
    <header>
      <h1>Where in the World?</h1>
      <button class="c-btn theme-mode">Toggle Dark/Light</button>
    </header>

    

    <main class="l-main">
      <div>
            <div class="search-filter">
            <input type="text" placeholder="Search for a country" id="searchInput" />
            <select id="regionFilter">
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
            </select>
          </div>
    
          <div>
          
          </div>
      </div>

      <div class="l-country-content u-grid"></div>
    </main>
    
    <footer></footer>
  `;
}
