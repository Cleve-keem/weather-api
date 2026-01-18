import { Request, Response } from "express";
import { sendError, sendSucess } from "../dtos/response/api.response.js";
import fetchWeatherDetails from "../services/fetch-weather.js";
import { client } from "../lib/redis-client.js";

const weatherController = async (req: Request, res: Response) => {
  const city = req.query.city as string;

  if (!city) {
    return sendError(
      res,
      400,
      "errors/missing-param",
      "Missing City Name",
      "Please provide a city name in the query string, e.g., ?city=Lagos"
    );
  }

  try {
    const cachedWeather = await client.get(city);
    if (cachedWeather) {
      console.log("[CACHE] Returning cached data");
      return sendSucess(res, 200, JSON.parse(cachedWeather));
    }

    const simplifiedWeather = await fetchWeatherDetails(city);
    await client.set(city, JSON.stringify(simplifiedWeather), {
      EX: 1000,
    });

    return sendSucess(res, 200, simplifiedWeather);
  } catch (err: any) {
    console.error(`[ERROR] ${err.message}`);
    return sendError(
      res,
      err.response?.status || 502,
      "/error/weather-service-failure",
      "Weather Provider Error",
      err.response?.data
    );
  }
};

export default weatherController;
