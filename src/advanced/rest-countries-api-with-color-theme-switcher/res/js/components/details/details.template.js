export function detailsTemplate(data) {
  return `
    <button class="c-btn btn-back">← Back</button>
    <div class="l-details u-flex">
      <img src="${data.flags.png}" alt="${data.name} flag" />
      <div>
        <h2>${data.name}</h2>
        <div>
         <p><strong>Native Name:</strong> ${data.nativeName}</p>
         <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
         <p><strong>Region:</strong> ${data.region}</p>
         <p><strong>Sub Region:</strong> ${data.subregion}</p>
         <p><strong>Capital:</strong> ${data.capital}</p>
        </div>
        
        <div>
            <p><strong>Top Level Domain:</strong> ${data.topLevelDomain.join(", ")}</p>
            <p><strong>Currencies:</strong> ${data.currencies.map((c) => c.name).join(", ")}</p>
            <p><strong>Languages:</strong> ${data.languages.map((l) => l.name).join(", ")}</p>
        </div>
        
        <p><strong>Border Countries:</strong> ${data.borders.join(", ")}</p>
      </div>
    </div>
  `;
}
