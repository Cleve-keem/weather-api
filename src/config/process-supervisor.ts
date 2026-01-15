import { Server } from "http";
import { client } from "../lib/redis-client.js";

class ProcessSupervisor {
  private server: Server;

  constructor(server: Server) {
    this.server = server;
  }

  public initialize(): void {
    // crashes
    process.on("uncaughtException", (err: Error) =>
      this.handleCrash("UncaughtException", err)
    );

    process.on("unhandledRejection", (reason: unknown) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));
      this.handleCrash("UnhandleRejection", error);
    });

    // system signal (new method)
    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, () => this.handleGracefulShutdown(signal));
    });

    // (system signal old method)
    // process.on("SIGINT", () => this.handleGracefulShutdown("SIGINT"));
    // process.on("SIGTERM", () => this.handleGracefulShutdown("SIGTERM"));
  }

  private async handleCrash(type: string, error: Error) {
    console.error(`[FATAL ERROR] ${type}:`, {
      message: error.message,
      time: new Date().toISOString(),
      stack: error.stack,
    });
    // while it crash shut down gracefully
    await this.handleGracefulShutdown(type, true);
  }

  private async handleGracefulShutdown(signal: string, isCrash = false) {
    console.log(`[SYSTEM] ${signal} received. Closing resources...`);

    // Force exit after 10s
    const forceExit = setTimeout(() => process.exit(1), 10000);
    forceExit.unref();

    try {
      // stop accepting new HTTP requests
      if (this.server.listening) {
        await new Promise((resolve) => this.server.close(resolve));
        console.log("[HTTP] Server closed.");
      }

      // close Redis/Database connections
      if (client.isOpen) {
        await client.quit();
        console.log("[REDIS] Disconnected.");
      }

      process.exit(isCrash ? 1 : 0);
    } catch (err) {
      console.error("[SYSTEM] Error during shutdown:", err);
      process.exit(1);
    }
    // console.error(`[SYSTEM] ${signal} received. Starting graceful shutdown...`);

    // const timeId = setTimeout(() => {
    //   console.log(
    //     "[SYSTEM] Forced shutdown: connections took too long to close."
    //   );
    //   process.exit(1);
    // }, 10000);

    // this.server.close((err?: Error) => {
    //   if (err) {
    //     console.error("[SYSTEM] Error during server close:", err);
    //     process.exit(1);
    //   }

    //   client
    //     .disconnect()
    //     .then(() => console.log("[REDIS] disconnected successfully!"));
    //   clearTimeout(timeId);
    //   console.log("[SYSTEM] All connections closed safely.");
    //   process.exit(0);
    // });
  }
}

export default ProcessSupervisor;
