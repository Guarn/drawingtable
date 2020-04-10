import { Point } from ".";

export interface IRectangle {
  id?: string;
  startPoint: Point;
  endPoint?: Point;
  strokeColor?: string;
  fillColor?: string;
  bgColor?: string;
  selected?: boolean;
  moving?: boolean;
  resizing?: boolean;
  offset?: Point;
  refCanvas: string;
}

export enum ToolType {
  SELECT = "select",
  RECTANGLE = "rectangle",
}
