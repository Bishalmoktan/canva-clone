import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./lib/db";
import designRoutes from "./routes/design.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/designs", designRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Express + TypeScript Design Service" });
});

// Start server
app.listen(port, async () => {
  console.log(
    `⚡️[server]: Design service is running at http://localhost:${port}`
  );
  await connectDB();
});
