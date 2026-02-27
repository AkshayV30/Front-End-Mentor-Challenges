import { getWeather } from "./api_weather.js";
import { transformWeatherData } from "./weatherService.js";
import { renderCurrent, renderDaily, renderHourly } from "./render.js";

async function loadWeather(lat = 52.52, lon = 13.41) {
  try {
    const rawData = await getWeather(lat, lon);
    const weather = transformWeatherData(rawData);

    renderCurrent(weather.current);
    renderDaily(weather.daily);
    renderHourly(weather.hourly);
  } catch (error) {
    console.error("App Error:", error);
  }
}

// Initial load
loadWeather();

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
  // Later you can integrate geocoding here
  loadWeather(52.52, 13.41);
});
