import express from "express";
import { authenticatedRequest } from "../middlewares/auth.middleware";
import {
  deleteDesign,
  getUserDesigns,
  getUserDesignsById,
  saveDesign,
} from "../controllers/design.controller";

const router = express.Router();

router.use(authenticatedRequest);

router.get("/", getUserDesigns);
router.get("/:id", getUserDesignsById);
router.post("/", saveDesign);
router.delete("/", deleteDesign);

export default router;
