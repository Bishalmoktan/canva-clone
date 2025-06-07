import { Request, Response, NextFunction } from "express";

export const authenticatedRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    res.status(401).json({
      error: "Access denied! Please login to continue",
    });
    return;
  }

  req.user = { userId };
  next();
};
