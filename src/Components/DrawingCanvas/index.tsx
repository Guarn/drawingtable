import React, { useEffect } from "react";
import { Canvas } from "./Styled";
import { ItemsStore, ContextStore } from "./Stores";
import { clearAndDrawAll } from "./Utils/Drawing";
import { ToolType } from "./Classes/Types";
import ToolsReducers from "./ToolsReducers";
import Keyboard from "./ToolsReducers/Keyboard";
import Zoom from "./ToolsReducers/Zoom";

export interface DrawingCanvasI {
  tool: ToolType;
}
const { setCanvasId, getCanvasDimensions, get2DContext } = ContextStore;
const { deselectAll } = ItemsStore;
const { width, height } = getCanvasDimensions();

const DrawingCanvas = ({ tool }: DrawingCanvasI) => {
  const handleMouseEvents = (event: React.MouseEvent) =>
    ToolsReducers(event, tool);
  const handleKeyboardEvents = (event: KeyboardEvent) => Keyboard(event, tool);
  const handleWheel = (event: React.WheelEvent) => Zoom(event);

  useEffect(() => {
    setCanvasId("MyCanvas");

    deselectAll();
    clearAndDrawAll();
    get2DContext()!.fillStyle = "black";
    get2DContext()!.fillRect(0, 0, 50, 50);
    document.addEventListener("keydown", handleKeyboardEvents);
    document.addEventListener("keyup", handleKeyboardEvents);
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvents);
      document.addEventListener("keyup", handleKeyboardEvents);
    };
  });

  return (
    <Canvas
      height={height}
      width={width}
      id="MyCanvas"
      onMouseDown={handleMouseEvents}
      onMouseUp={handleMouseEvents}
      onMouseMove={handleMouseEvents}
      onMouseLeave={handleMouseEvents}
      onWheel={handleWheel}
    />
  );
};
export default DrawingCanvas;
