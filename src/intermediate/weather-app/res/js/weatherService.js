export function transformWeatherData(data) {
  return {
    current: data.current,
    daily: data.daily,
    hourly: data.hourly,
  };
}
