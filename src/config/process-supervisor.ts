import { Server } from "http";

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

    // system signal
    process.on("SIGINT", () => this.handleGracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => this.handleGracefulShutdown("SIGTERM"));
  }

  private handleCrash(type: string, error: Error): void {
    console.error(`[FATAL ERROR] ${type}:`, {
      message: error.message,
      time: new Date().toISOString(),
      stack: error.stack,
    });
  }

  private handleGracefulShutdown(signal: string): void {
    console.error(`[SYSTEM] ${signal} received. Starting graceful shutdown...`);

    const timeId = setTimeout(() => {
      console.log(
        "[SYSTEM] Forced shutdown: connections took too long to close."
      );
      process.exit(1);
    }, 10000);

    this.server.close((err?: Error) => {
      if (err) {
        console.error("[SYSTEM] Error during server close:", err);
        process.exit(1);
      }
      clearTimeout(timeId);
      console.log("[SYSTEM] All connections closed safely.");
      process.exit(0);
    });
  }
}

export default ProcessSupervisor;
