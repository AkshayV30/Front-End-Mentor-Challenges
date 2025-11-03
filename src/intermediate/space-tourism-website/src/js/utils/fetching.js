export async function fetchCrew() {
  const res = await fetch('./src/data/data_crew.json');
  const json = await res.json();
  return json.crew;
}

export async function fetchDestination() {
  const res = await fetch('./src/data/data_destination.json');
  const json = await res.json();
  return json.destinations;
}

export async function fetchTechnology() {
  const res = await fetch('./src/data/data_technology.json');
  const json = await res.json();
  return json.technology;
}
