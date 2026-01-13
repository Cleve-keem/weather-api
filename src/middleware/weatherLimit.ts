import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  legacyHeaders: false,
  standardHeaders: true,
  limit: 50,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

export default limiter;
