export async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current=apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation` +
    `&hourly=temperature_2m` +
    `&daily=temperature_2m_max,temperature_2m_min`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather API failed");
  }

  return await response.json();
}
