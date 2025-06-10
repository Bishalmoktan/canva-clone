"use client";

import { initializeFabric } from "@/fabric/fabric.utils";
import { useEditorStore } from "@/store";
import { Canvas } from "fabric";
import { useEffect, useRef } from "react";

function CanvasComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const initAttemptedRef = useRef(false);

  const { setCanvas } = useEditorStore();

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (e) {
          console.error("Error disposing canvas", e);
        }

        fabricCanvasRef.current = null;
        setCanvas(null);
      }
    };

    cleanUpCanvas();

    //reset init flag
    initAttemptedRef.current = false;

    //init our canvas
    const initcanvas = async () => {
      if (
        typeof window === undefined ||
        !canvasRef.current ||
        initAttemptedRef.current
      ) {
        return;
      }

      initAttemptedRef.current = true;

      try {
        const fabricCanvas = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current
        );

        if (!fabricCanvas) {
          console.error("Failed to initialize Fabric.js canvas");

          return;
        }

        fabricCanvasRef.current = fabricCanvas;
        //set the canvas in store
        setCanvas(fabricCanvas);

        console.log("Canvas init is done and set in store");

        //apply custom style for the controls

        //set up event listeners
      } catch (e) {
        console.error("Failed to init canvas", e);
      }
    };

    const timer = setTimeout(() => {
      initcanvas();
    }, 50);

    return () => {
      clearTimeout(timer);
      cleanUpCanvas();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[600px] overflow-auto"
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default CanvasComponent;
