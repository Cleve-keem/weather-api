import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("[REDIS] connected successfully!");
  }
};

export { client, connectRedis };
