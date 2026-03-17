export function filterCountries(countries, term, region) {
  const searchTerm = term.toLowerCase();

  return countries.filter((country) => {
    const matchRegion = region === "All" || country.region === region;
    const matchSearch = country.name.toLowerCase().includes(searchTerm);

    return matchRegion && matchSearch;
  });
}
