export function uniqueRegions(countries) {
  return [...new Set(countries.map((c) => c.region))];
}
