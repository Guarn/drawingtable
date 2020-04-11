import { MouseEvent } from "react";
import { ToolType } from "../Classes/Types";
import ToolRectangle from "./ToolRectangle";
import ToolSelect from "./ToolSelect";

const { RECTANGLE, SELECT } = ToolType;

const ToolsReducers = (event: MouseEvent, tool: ToolType) => {
  switch (tool) {
    case RECTANGLE:
      ToolRectangle(event);
      break;
    case SELECT:
      ToolSelect(event);
      break;
  }
};

export default ToolsReducers;
