import { OAuth2Client, TokenPayload } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/env.config";
import { NextFunction, Request, Response } from "express";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      error: "Access denied! No token provided",
    });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as TokenPayload;

    // Add user to req.user
    req.user = {
      userId: payload["sub"],
      email: payload["email"],
      name: payload["name"],
    };

    // Add user id to headers for downstream services
    req.headers["x-user-id"] = payload["sub"];

    // optional
    req.headers["x-user-email"] = payload["email"];
    req.headers["x-user-name"] = payload["name"];

    next();
  } catch (error) {
    console.error("Token verification failed", error);
    res.status(401).json({
      error: "Access denied! No token provided",
    });
  }
}
