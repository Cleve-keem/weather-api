import express, { Application, Request, Response } from "express";
import weatherController from "../controllers/weatherController.js";

const expressLoader = (): Application => {
  const app: Application = express();

  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "UP", pid: process.pid });
  });

  app.get("/api/v1/weather", weatherController);

  return app;
};

export default expressLoader;
