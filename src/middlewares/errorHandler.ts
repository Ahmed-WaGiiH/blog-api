import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: true,
    statusCode,
    message,
  });
};

export default errorHandler;
