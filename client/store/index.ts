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
  name: string;
  setName: (name: string) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
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

  isEditing: false,
  setIsEditing: (value) => set({ isEditing: value }),

  name: "Untitled Design",
  setName: (name) => set({ name }),

  resetStore: () => {
    set({
      canvas: null,
      designId: null,
    });
  },
}));
