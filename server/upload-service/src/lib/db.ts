import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Error connecting to DB: ", error);
  }
};
