export function detailsComponent(country) {
  const currencies = country.currencies
    ?.map((c) => `${c.name} (${c.symbol ?? ""})`)
    .join(", ");

  const languages = country.languages?.map((lang) => lang.name).join(", ");

  const domains = country.topLevelDomain?.join(", ");

  const borders = country.borders
    ?.map(
      (code) =>
        `<button class="c-btn btn-border u-flex u-gap-md">${code}</button>`,
    )
    .join("");

  return `

  
  <section class="country-details u-flex u-col u-items-start u-justify-center  ">
  
    <button class="c-btn btn-detail-back js-btn-detail-back">Back</button>
    
    <div class="c-country-details__content u-flex u-items-center">

        <img class="c-country-details__flag" src="${country.flag}"  alt="${country.name}-flag"/>

        <div class="c-country-detailed__content">

            <h2>${country.name}</h2>

            <div class="u-flex u-gap-lg">
                <div>
                <p><strong>Population :</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region :</strong> ${country.region}</p>
                <p><strong>Sub Region :</strong> ${country.subregion}</p>
                <p><strong>Capital :</strong> ${country.capital}</p>
                </div>
                
                <div>
                <p><strong>Top Level Domain :</strong> ${domains}</p>
                <p><strong>Currencies :</strong> ${currencies}</p>
                <p><strong>Languages :</strong> ${languages}</p>
                </div>
                </div>
                
                <div class="c-country-details__borders u-flex u-flex-align"> <strong>Border Countries :</strong> ${borders ?? " "} </div>
                
            </div>
        </div>
    </div>    
</section>

`;
}
