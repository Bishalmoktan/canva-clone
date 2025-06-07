import { Request, Response } from "express";
import { Design } from "../models/design.model";

export const getUserDesigns = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const designs = await Design.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: designs,
    });
  } catch (error) {
    console.error("Error fetching designs", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

export const getUserDesignsById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const designId = req.params.id;

    const design = await Design.find({ _id: designId, userId });

    if (!design) {
      res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to view it.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (error) {
    console.error("Error fetching designs", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

export const saveDesign = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { designId, name, canvasData, width, height, category } = req.body;

    if (designId) {
      const design = await Design.findOne({ _id: designId, userId });
      if (!design) {
        res.status(404).json({
          success: false,
          message: "Design not found! or you don't have permission to view it.",
        });
        return;
      }

      if (name) design.name = name;
      if (canvasData) design.canvasData = canvasData;
      if (width) design.width = width;
      if (height) design.height = height;
      if (category) design.category = category;

      design.updatedAt = Date.now();
      const updatedDesign = await design.save();

      res.status(200).json({
        success: true,
        data: updatedDesign,
      });
    } else {
      const newDesign = new Design({
        userId,
        name: name || "Untitled Design",
        width,
        height,
        canvasData,
        category,
      });

      const saveDesign = await newDesign.save();
      res.status(200).json({
        success: true,
        data: saveDesign,
      });
    }
  } catch (error) {
    console.error("Error fetching designs", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

export const deleteDesign = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to delete it.",
      });
      return;
    }

    await Design.deleteOne({ _id: designId });

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (e) {
    console.error("Error while deleting design", e);
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};
