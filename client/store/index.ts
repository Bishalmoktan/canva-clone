"use client";

import { Canvas } from "fabric";
import { create } from "zustand";
import { centerCanvas } from "@/fabric/fabric.utils";

type State = {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  designId: string | null;
  setDesignId: (id: string | null) => void;
  resetStore: () => void;
};

export const useEditorStore = create<State>((set) => ({
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },

  designId: null,
  setDesignId: (id) => set({ designId: id }),

  resetStore: () => {
    set({
      canvas: null,
      designId: null,
    });
  },
}));
