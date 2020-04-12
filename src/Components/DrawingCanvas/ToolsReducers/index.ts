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
    // No Space Bar

    switch (tool) {
      case RECTANGLE:
        ToolRectangle(event);
        break;
      case SELECT:
        ToolSelect(event);
        break;
    }
  } else {
    // Space Bar active

    const realPoint = getRealPoint(event.clientX, event.clientY);
    const { e, f } = get2DContext()!.getTransform();
    switch (event.type) {
      case "mousedown":
        console.log("MouseDown", e, f);
        setContextOffset(realPoint.x, realPoint.y);

        break;
      case "mousemove":
        if (event.buttons > 0) {
          const tempCoords = substract(realPoint, getContextOffset());
          console.log("TempsCoords", tempCoords);

          get2DContext()?.setTransform(
            1,
            0,
            0,
            1,
            getContextCoords().x + tempCoords.x,
            getContextCoords().y + tempCoords.y
          );
          clearAndDrawAll();
        }
        break;
      case "mouseup":
        setContextCoords(e, f);

        setContextOffset(0, 0);
        console.log("MouseUp", e, f);

        break;
    }
  }
};

export default ToolsReducers;
