import { MouseEvent } from "react";
import { ToolType } from "../Classes/Types";
import ToolRectangle from "./ToolRectangle";
import ToolSelect from "./ToolSelect";
import { ContextStore } from "../Stores";
import { getRealPoint } from "../Utils/Coords";
import { Point } from "../Classes";
import { clearAndDrawAll } from "../Utils/Drawing";

const { substract } = Point;
const { RECTANGLE, SELECT } = ToolType;
const {
  isTranslating,
  setContextOffset,
  setContextCoords,
  getContextOffset,
  getContextCoords,
  get2DContext,
} = ContextStore;

const ToolsReducers = (event: MouseEvent, tool: ToolType) => {
  if (!isTranslating()) {
    switch (tool) {
      case RECTANGLE:
        ToolRectangle(event);
        break;
      case SELECT:
        ToolSelect(event);
        break;
    }
  } else {
    const realPoint = getRealPoint(event.clientX, event.clientY);
    switch (event.type) {
      case "mousedown":
        setContextOffset(realPoint.x, realPoint.y);
        break;
      case "mousemove":
        const tempCoords = substract(realPoint, getContextOffset());
        if (event.buttons > 0) {
          setContextCoords(tempCoords.x, tempCoords.y);
          get2DContext()?.setTransform(1, 0, 0, 1, tempCoords.x, tempCoords.y);
          clearAndDrawAll();
        }
        break;
      case "mouseup":
        setContextOffset(0, 0);
        break;
    }
  }
};

export default ToolsReducers;
