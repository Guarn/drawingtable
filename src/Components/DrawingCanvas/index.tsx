import React, { useEffect } from "react";
import { Canvas } from "./Styled";
import { ItemsStore, ContextStore } from "./Stores";
import { ClearAndDrawAll } from "./Utils/Drawing";
import { ToolType } from "./Classes/Types";
import ToolsReducers from "./ToolsReducers";

export interface DrawingCanvasI {
  tool: ToolType;
}
const { setCanvasId, getCanvasDimensions } = ContextStore;
const { deselectAll } = ItemsStore;
const { width, height } = getCanvasDimensions();

const DrawingCanvas = ({ tool }: DrawingCanvasI) => {
  const handleEvents = (event: React.MouseEvent | KeyboardEvent) => {
    ToolsReducers(event, tool);
  };

  useEffect(() => {
    setCanvasId("MyCanvas");

    deselectAll();
    ClearAndDrawAll();

    document.addEventListener("keydown", handleEvents);
    document.addEventListener("keyup", handleEvents);
    return () => {
      document.removeEventListener("keydown", handleEvents);
      document.addEventListener("keyup", handleEvents);
    };
  });

  return (
    <Canvas
      height={height}
      width={width}
      id="MyCanvas"
      onMouseDown={handleEvents}
      onMouseUp={handleEvents}
      onMouseMove={handleEvents}
      onMouseLeave={handleEvents}
    />
  );
};
export default DrawingCanvas;
