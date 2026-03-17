export function detailsComponent(country) {
  return `

<button class="c-btn js-btn-detail-back">Back</button>

<section class="c-country-details">

    <img class="c-country-details__flag" src="${country.flag}" />

    <div class="c-country-details__content">

        <h2>${country.name}</h2>

        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>

    </div>

</section>

`;
}
