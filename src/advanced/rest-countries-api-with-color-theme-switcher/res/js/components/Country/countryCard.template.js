export function countryCardTemplate(country) {
  return `
    <div class="c-card" data-country="${country.alpha3Code}">
      <img src="${country.flags.png}" alt="${country.name} flag" />
      <div class="c-card__info">
        <h3>${country.name}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      </div>
    </div>
  `;
}
