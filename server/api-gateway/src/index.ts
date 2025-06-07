import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import proxy from "express-http-proxy";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// proxy
const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.url.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: Error, res: Response) => {
    res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  },
};

app.use(
  "/v1/designs",
  authMiddleware,
  proxy(process.env.DESIGN!, {
    ...proxyOptions,
  })
);

app.use(
  "/v1/upload",
  authMiddleware,
  proxy(process.env.UPLOAD!, {
    ...proxyOptions,
    parseReqBody: false,
  })
);

app.use(
  "/v1/media",
  authMiddleware,
  proxy(process.env.UPLOAD!, {
    ...proxyOptions,
    parseReqBody: true,
  })
);

app.use(
  "/v1/subscription",
  authMiddleware,
  proxy(process.env.SUBSCRIPTION!, {
    ...proxyOptions,
    parseReqBody: true,
  })
);

app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
