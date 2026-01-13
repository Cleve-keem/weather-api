import axios from "axios";
import { Request, Response } from "express";
import { sendError, sendSucess } from "../dtos/response/api.response.js";

const weatherController = async (req: Request, res: Response) => {
  const { city } = req.query;
  
  const BASE_URL = process.env.WEATHER_API_BASE_URL!;
  const API_KEY = process.env.WEATHER_API_KEY!;

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
    const response = await axios.get(`${BASE_URL}/${city}?key=${API_KEY}`);
    return sendSucess(res, 200, response.data, {
      links: {
        self: { href: req.originalUrl, method: "GET" },
        health: { href: "/health", method: "GET" },
      },
    });
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
