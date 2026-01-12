import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import axios from "axios";
import { errorResponse } from "../dtos/response/api.response.js";

const BASE_URL = process.env.WEATHER_API_BASE_URL as string;
const API_KEY = process.env.WEATHER_API_KEY as string;

console.log(BASE_URL);
console.log(API_KEY);

const expressLoader = (): Application => {
  const app: Application = express();

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "UP", pid: process.pid });
  });

  app.get("/api/v1/weather", async (req: Request, res: Response) => {
    const { city } = req.query;
    try {
      const response = await axios.get(`${BASE_URL}/${city}?key=${API_KEY}`);
      const data = response.data;
      console.log(data);
    } catch (err) {
      console.error(`[ERROR] ${err}`);
      return errorResponse(res, 500, "Internal error", err);
    }
  });

  return app;
};

export default expressLoader;
