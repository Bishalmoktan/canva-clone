import { TokenPayload } from "google-auth-library";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email?: string;
        name?: string;
      };
    }
  }
}
