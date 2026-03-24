import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error handler caught error:", err.message);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
};
