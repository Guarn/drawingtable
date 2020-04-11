import { v4 as uuid } from "uuid";
import { Point } from ".";

export default class Shape {
  constructor(
    readonly id: string = uuid(),
    protected startPoint = new Point(0, 0),
    protected selected = false,
    protected moving = false,
    protected resizing = false,
    protected strokeColor = "black",
    protected fillColor = "lightgrey",
    protected strokeWidth = 1,
    protected offset = new Point(0, 0)
  ) {}

  isSelected() {
    return this.selected;
  }

  select(point: Point) {
    this.selected = true;
    this.offset = point;
  }
  deselect() {
    this.selected = false;
    this.moving = false;
    this.resizing = false;
  }

  getStartPoint() {
    return this.startPoint;
  }

  draw() {}
  drawHandlers() {}
  isPointIn(point: Point | [number, number]): boolean {
    return false;
  }
  isHandleSelected(
    point: Point
  ): { found: false; handler: undefined } | { found: true; handler: string } {
    return { found: true, handler: "none" };
  }

  selectHandle(point: Point, handler: string) {}
  setMoving(isMoving: boolean) {
    this.moving = isMoving;
  }
  isMoving() {
    return this.moving;
  }
  setResizing(isResizing: boolean) {
    this.resizing = isResizing;
  }
  isResizing() {
    return this.resizing;
  }

  getFillStyle() {
    return this.fillColor;
  }
  setFillColor(color: string) {
    this.fillColor = color;
  }
  getStrokeStyle() {
    return this.strokeColor;
  }
  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  getLineWidth() {
    return this.strokeWidth;
  }
  setLineWidth(width: number) {
    this.strokeWidth = width;
  }
  move(point: Point) {}
  resize(point: Point) {}
}
