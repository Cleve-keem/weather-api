import { Response } from "express";

const sendSucess = (
  res: Response,
  statusCode: number,
  paylaod: unknown,
  detail?: string
) => {
  res.status(statusCode).json({
    status: "success",
    detail,
    data: paylaod,
  });
};

const sendError = (
  res: Response,
  statusCode: number,
  // type: string = "/errors/general",
  title: string,
  detail: string,
  instance?: string
) => {
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    title,
    detail,
    instance: instance || res.req.originalUrl,
  });
};

export { sendSucess, sendError };
