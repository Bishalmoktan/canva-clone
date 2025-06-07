import mongoose, { Model } from "mongoose";
import { IDesign } from "../types/design.type";

type DesignModel = Model<IDesign>;

const DesignSchema = new mongoose.Schema<IDesign, DesignModel>({
  userId: String,
  name: String,
  canvasData: String,
  width: Number,
  height: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Design =
  mongoose.models.Design ||
  mongoose.model<IDesign, DesignModel>("Design", DesignSchema);
