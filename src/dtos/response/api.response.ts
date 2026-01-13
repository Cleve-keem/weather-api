import { Response } from "express";

const sendSucess = (
  res: Response,
  statusCode: number,
  detail: string,
  data: unknown,
  links?: Record<string, { href: string; method: string }>
) => {
  res
    .status(statusCode)
    .json({ status: "success", detail, data, ...(links && { _links: links }) });
};

const sendError = (
  res: Response,
  statusCode: number,
  type: string = "/errors/general",
  title: string,
  detail: string,
  instance?: string
) => {
  res.status(statusCode).json({
    status: statusCode,
    type,
    title,
    detail,
    instance: instance || res.req.originalUrl,
  });
};

export { sendSucess, sendError};
