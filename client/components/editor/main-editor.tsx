"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEditorStore } from "@/store";
import { getUserDesignByID } from "@/services/design.service";

function MainEditor() {
  const params = useParams();
  const router = useRouter();
  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState<string | null>("");

  const { canvas, setDesignId, resetStore } = useEditorStore();

  useEffect(() => {
    resetStore();

    if (designId) setDesignId(designId as string);

    return () => {
      resetStore();
    };
  }, []);

  useEffect(() => {
    setLoadAttempted(false);
    setError(null);
  }, [designId]);

  useEffect(() => {
    if (isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (isLoading) {
          console.log("Canvas init timeout");
          setIsLoading(false);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, canvas, designId]);

  useEffect(() => {
    if (canvas) {
      console.log("Canvas is now available in editor");
    }
  }, [canvas]);

  //load the design ->
  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;
    try {
      setIsLoading(true);
      setLoadAttempted(true);

      const response = await getUserDesignByID(designId as string);

      const design = response.data;

      if (design) {
        setDesignId(designId as string);

        try {
          if (design.canvasData) {
            canvas.clear();

            if (design.width && design.height) {
              canvas.setDimensions({
                width: design.width,
                height: design.height,
              });
            }

            const canvasData =
              typeof design.canvasData === "string"
                ? JSON.parse(design.canvasData)
                : design.canvasData;

            const hasObjects =
              canvasData.objects && canvasData.objects.length > 0;

            if (canvasData.background) {
              canvas.backgroundColor = canvasData.background;
            } else {
              canvas.backgroundColor = "#ffffff";
            }

            if (!hasObjects) {
              canvas.renderAll();
              return true;
            }

            canvas
              .loadFromJSON(design.canvasData)
              .then((canvas) => canvas.requestRenderAll());
          } else {
            console.log("Canvas data is not available");
            canvas.clear();
            canvas.setDimensions({
              width: 825,
              height: 465,
            });
            canvas.backgroundColor = "#FFFFFF";
            canvas.renderAll();
            console.log(canvas);
          }
        } catch (error) {
          console.error("Error loading canvas " + error);
          setError("Error loading canvas");
        } finally {
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.error("Failed to load design", e);
      setError("failed to load design");
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      router.replace("/");
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {<Sidebar />}

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-hidden bg-[#f0f0f0] flex items-center justify-center">
            {error && <p>{error}</p>}
            <Canvas />
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainEditor;
