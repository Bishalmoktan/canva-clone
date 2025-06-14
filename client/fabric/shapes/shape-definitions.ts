/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticCanvas } from "fabric";
import type * as fabricjs from "fabric";

type ShapeDefinition = {
  type: string;
  label: string;
  defaultProps: Record<string, any>;
  thumbnail: (fabric: typeof fabricjs, canvas: StaticCanvas) => void;
};

export const shapeDefinitions: Record<string, ShapeDefinition> = {
  rectangle: {
    type: "rect",
    label: "Rectangle",
    defaultProps: {
      width: 100,
      height: 60,
      fill: "#000000",
    },
    thumbnail: (fabric: typeof fabricjs, canvas: StaticCanvas) => {
      const { Rect } = fabric;
      const rect = new Rect({
        left: 15,
        top: 35,
        width: 70,
        height: 35,
        fill: "#000000",
      });
      canvas.add(rect);
    },
  },
  square: {
    type: "rect",
    label: "Square",
    defaultProps: {
      width: 80,
      height: 80,
      fill: "#000000",
    },
    thumbnail: (fabric: typeof fabricjs, canvas: StaticCanvas) => {
      const { Rect } = fabric;
      const square = new Rect({
        left: 20,
        top: 20,
        width: 60,
        height: 60,
        fill: "#000000",
      });
      canvas.add(square);
    },
  },
  circle: {
    type: "circle",
    label: "Circle",
    defaultProps: {
      radius: 50,
      fill: "#000000",
    },
    thumbnail: (fabric: typeof fabricjs, canvas: StaticCanvas) => {
      const { Circle } = fabric;
      const circle = new Circle({
        left: 20,
        top: 20,
        radius: 30,
        fill: "#000000",
      });
      canvas.add(circle);
    },
  },
};

export const shapeTypes = ["rectangle", "square", "circle"];
