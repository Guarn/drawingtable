import ContextStore from "../Stores/ContextStore";
import { Point } from "../Classes";

const { substract } = Point;
const { getCanvasCoords } = ContextStore;

export const getRealPoint = (
  x: number,
  y: number,
  canvasCoords?: [number, number]
) => {
  return canvasCoords
    ? substract({ x, y }, canvasCoords)
    : substract({ x, y }, getCanvasCoords());
};
