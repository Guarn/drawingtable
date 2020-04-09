import ContextStore from "../Stores/ContextStore";
import { Point } from "../Classes";

const { substract } = Point;
const { getCanvasCoords } = ContextStore;

export const getRealPoint = (x: number, y: number) => {
  const realPoint = substract({ x, y }, getCanvasCoords());
  return realPoint;
};
