import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import { Application } from "express";
import { Server } from "http";
import expressLoader from "./main/app.js";
import ProcessSupervisor from "./config/process-supervisor.js";

const startServer = (): void => {
  const app: Application = expressLoader();
  const PORT: number = Number(process.env.PORT) || 3030;

  const server: Server = app.listen(PORT, () => {
    console.log(`[BOOT] Server running on port ${PORT} (PID: ${process.pid})`);
  });

  const supervisor = new ProcessSupervisor(server);
  supervisor.initialize();
};

startServer();
