import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = (result.error as ZodError).issues
        .map((e) => e.message)
        .join(", ");
      res.status(400).json({
        error: true,
        statusCode: 400,
        message,
      });
      return;
    }
    req.body = result.data;
    next();
  };

export default validate;
