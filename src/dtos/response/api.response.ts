import { Response } from "express";

const sucessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown
) => {
  res.status(statusCode).json({ status: "success", message, data });
};

const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: any = null
) => {
  res.status(statusCode).json({
    status: "error",
    message,
    error: {
      message: error.message,
      code: error.code,
      // stack: error.stack,
    },
  });
};

export { sucessResponse, errorResponse };
