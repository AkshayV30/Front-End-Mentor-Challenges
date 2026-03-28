export function detailsComponent(country) {
  console.log(country);
  const currencies = country.currencies
    ?.map((c) => `${c.name} (${c.symbol ?? ""})`)
    .join(", ");

  const languages = country.languages?.map((lang) => lang.name).join(", ");

  const domains = country.topLevelDomain?.join(", ");

  const borders = country.borders
    ?.map((code) => `<button class="c-btn btn-border">${code}</button>`)
    .join("");

  return `

  
  <section class="l-countries-details u-flex u-col u-items-stretch">
  
    <button class="c-btn btn-detail-back js-btn-detail-back u-flex u-items-center u-justify-between">
      <span class="c-chevron" data-direction="left"> </span>
      <span> Back  </span>  
    </button>
    
    <div class="l-country-details__content u-flex u-items-center u-justify-between ">

        <img class="c-country-details__flag" src="${country.flag}"  alt="${country.name}-flag"/>

        <div class="c-country-detailed__content u-flex u-col u-items-start ">

            <h2>${country.name}</h2>

            <div class=" c-country-detailed__container u-flex u-gap-lg">
                <div>
                <p><strong>Native Name :</strong> ${country.nativeName}</p>
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
                
                <div class="c-country-details__borders u-flex u-items-center"> 
                <strong>Border Countries :</strong> 
                <span> ${borders ?? " "} </span>
                 </div>
                
            </div>
        </div>
    </div>    
</section>

`;
}
