import axios from "axios";

export default async function fetchWeatherDetails(city: string) {
  const BASE_URL = process.env.WEATHER_API_BASE_URL!;
  const API_KEY = process.env.WEATHER_API_KEY!;

  try {
    const response = await axios.get(`${BASE_URL}/${city}?key=${API_KEY}`, {
      timeout: 5000,
    });
    const weather = response.data;
    const simplifiedWeather = {
      location: weather.resolvedAddress,
      timezone: weather.timezone,
      today: {
        temp: weather.days[0].temp,
        tempMax: weather.days[0].tempmax,
        tempMin: weather.days[0].tempmin,
        feelsLike: weather.days[0].feelslike,
        condition: weather.days[0].conditions,
        description: weather.days[0].description,
        humidity: weather.days[0].humidity,
        windSpeed: weather.days[0].windspeed,
      },
      hourly: weather.days[0].hours.map((h: any) => ({
        time: h.datetime,
        temp: h.temp,
        feelslike: h.feelslike,
        humidity: h.humidity,
        conditions: h.conditions,
      })),
    };
    return simplifiedWeather;
  } catch (err: any) {
    console.error(`[ERROR] ${err.message}`);
    throw err;
  }
}
