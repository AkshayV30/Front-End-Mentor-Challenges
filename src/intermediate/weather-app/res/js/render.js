export function renderCurrent(current) {
  document.getElementById("feelsLike").textContent =
    `${current.apparent_temperature}°`;

  document.getElementById("humidity").textContent =
    `${current.relative_humidity_2m}%`;

  document.getElementById("wind").textContent =
    `${current.wind_speed_10m} km/h`;

  document.getElementById("precipitation").textContent =
    `${current.precipitation} mm`;
}

export function renderDaily(daily) {
  const container = document.getElementById("dailyForecast");
  container.innerHTML = "";

  daily.time.forEach((day, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h3>${new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</h3>
      <div>
        <p>${daily.temperature_2m_max[index]}°</p>
        <p>${daily.temperature_2m_min[index]}°</p>
      </div>
    `;

    container.appendChild(li);
  });
}

export function renderHourly(hourly) {
  const container = document.getElementById("hourlyForecast");
  container.innerHTML = "";

  hourly.time.slice(0, 8).forEach((time, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <p>${new Date(time).getHours()}:00</p>
      </div>
      <p>${hourly.temperature_2m[index]}°</p>
    `;

    container.appendChild(li);
  });
}
