import { Point } from ".";
import Shape from "./Shape";
import ContextStore from "../Stores/ContextStore";

const { substract } = Point;
const { get2DContext, getHandlerRadius, getContextCoords } = ContextStore;

export default class newRectangle extends Shape {
  startPoint: Point;
  endPoint: Point;
  width: number;
  height: number;
  handlerSelected = "";

  /**Creates a new Rectangle with (0,0)(0,0) */
  constructor();
  /**Creates a new Rectangle with (startPoint)(endPoint) */
  constructor(startPoint: Point, endPoint: Point);
  constructor(startPoint?: Point, endPoint?: Point) {
    super();

    if (startPoint && endPoint) {
      this.startPoint = startPoint;
      this.endPoint = endPoint;
    } else {
      this.startPoint = new Point(0, 0);
      this.endPoint = new Point(0, 0);
    }
    this.width = substract(this.endPoint, this.startPoint).x;
    this.height = substract(this.endPoint, this.startPoint).y;
  }

  draw() {
    const ctx = get2DContext();
    ctx?.beginPath();
    ctx!.lineWidth = this.strokeWidth;
    ctx!.strokeStyle = this.strokeColor;
    ctx!.fillStyle = this.fillColor;
    ctx?.rect(this.startPoint.x, this.startPoint.y, this.width, this.height);
    ctx?.stroke();
    ctx?.fill();
  }
  drawHandlers() {
    const ctx = get2DContext();
    ctx?.beginPath();
    ctx?.moveTo(this.startPoint.x + 5, this.startPoint.y);
    console.log("DrawHandlers");

    ctx!.strokeStyle = "#21A8E2";
    ctx!.fillStyle = "#B4E8FF";
    ctx?.arc(this.startPoint.x, this.startPoint.y, 5, 0, 360);
    ctx?.stroke();
    ctx?.fill();
    ctx?.beginPath();

    ctx?.moveTo(this.endPoint.x + 5, this.startPoint.y);

    ctx?.arc(this.endPoint.x, this.startPoint.y, 5, 0, 360);
    ctx?.stroke();
    ctx?.fill();
    ctx?.beginPath();

    ctx?.moveTo(this.endPoint.x + 5, this.endPoint.y);
    ctx?.arc(this.endPoint.x, this.endPoint.y, 5, 0, 360);
    ctx?.stroke();
    ctx?.fill();
    ctx?.beginPath();

    ctx?.moveTo(this.startPoint.x + 5, this.endPoint.y);
    ctx?.arc(this.startPoint.x, this.endPoint.y, 5, 0, 360);
    ctx?.stroke();
    ctx?.fill();
    ctx?.beginPath();
  }
  isPointIn(point: Point): boolean {
    const { x, y } = point;
    let widthReverse = this.startPoint.x >= this.endPoint.x;
    let heightReverse = this.startPoint.y >= this.endPoint.y;

    if (
      widthReverse &&
      heightReverse &&
      x < this.startPoint.x + getHandlerRadius() &&
      y < this.startPoint.y + getHandlerRadius() &&
      x > this.endPoint.x - getHandlerRadius() &&
      y > this.endPoint.y - getHandlerRadius()
    ) {
      return true;
    }
    if (
      !widthReverse &&
      !heightReverse &&
      x > this.startPoint.x - getHandlerRadius() &&
      y > this.startPoint.y - getHandlerRadius() &&
      x < this.endPoint.x + getHandlerRadius() &&
      y < this.endPoint.y + getHandlerRadius()
    ) {
      return true;
    }
    if (
      widthReverse &&
      !heightReverse &&
      x < this.startPoint.x + getHandlerRadius() &&
      y > this.startPoint.y - getHandlerRadius() &&
      x > this.endPoint.x - getHandlerRadius() &&
      y < this.endPoint.y + getHandlerRadius()
    ) {
      return true;
    }

    if (
      !widthReverse &&
      heightReverse &&
      x > this.startPoint.x - getHandlerRadius() &&
      y < this.startPoint.y + getHandlerRadius() &&
      x < this.endPoint.x + getHandlerRadius() &&
      y > this.endPoint.y - getHandlerRadius()
    ) {
      return true;
    }

    return false;
  }

  isHandleSelected(
    point: Point
  ): { found: false; handler: undefined } | { found: true; handler: string } {
    const handleSelected = this.calculateHandlers(point);
    if (!handleSelected) {
      return { found: false, handler: undefined };
    } else {
      return { found: true, handler: handleSelected };
    }
  }

  private calculateHandlers(point: Point) {
    const topLeft = this.startPoint;
    const bottomRight = this.endPoint;
    const topRight = new Point(this.endPoint.x, this.startPoint.y);
    const bottomLeft = new Point(this.startPoint.x, this.endPoint.y);

    if (this.isPointClose(topLeft, point)) {
      return "topLeft";
    }
    if (this.isPointClose(bottomRight, point)) {
      return "bottomRight";
    }
    if (this.isPointClose(bottomLeft, point)) {
      return "bottomLeft";
    }
    if (this.isPointClose(topRight, point)) {
      return "topRight";
    }
    return "";
  }

  private isPointClose(pointArea: Point, pointClick: Point) {
    const { x, y } = pointArea;
    if (
      this.isPointCloseNumber(x, pointClick.x) &&
      this.isPointCloseNumber(y, pointClick.y)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private isPointCloseNumber(xArea: number, xClick: number) {
    if (
      xClick >= xArea - getHandlerRadius() &&
      xClick <= xArea + getHandlerRadius()
    ) {
      return true;
    } else {
      return false;
    }
  }

  move(point: Point) {
    this.startPoint = substract(point, this.offset);
    this.endPoint = new Point(
      this.startPoint.x + this.width,
      this.startPoint.y + this.height
    );
  }
  getDimensions() {
    return { width: this.width, height: this.height };
  }
  recalculateDimensions() {
    this.width = substract(this.endPoint, this.startPoint).x;
    this.height = substract(this.endPoint, this.startPoint).y;
  }
  setPoints(startPoint?: Point, endPoint?: Point) {
    if (startPoint) {
      this.startPoint = startPoint;
    }
    if (endPoint) {
      this.endPoint = endPoint;
    }
    this.recalculateDimensions();
  }
  resize(point: Point) {
    console.log(this.handlerSelected);

    switch (this.handlerSelected) {
      case "topLeft":
        this.startPoint = substract(point, this.offset);
        this.recalculateDimensions();
        break;
      case "bottomRight":
        this.endPoint = substract(point, this.offset);
        this.recalculateDimensions();
        break;
      case "topRight":
        let newStart = new Point(this.startPoint.x, point.y - this.offset.y);
        let newEnd = new Point(point.x - this.offset.x, this.endPoint.y);
        this.startPoint = newStart;
        this.endPoint = newEnd;
        this.recalculateDimensions();
        break;
      case "bottomLeft":
        let newStart1 = new Point(point.x - this.offset.x, this.startPoint.y);
        let newEnd1 = new Point(this.endPoint.x, point.y - this.offset.y);
        this.startPoint = newStart1;
        this.endPoint = newEnd1;
        this.recalculateDimensions();
        break;
      default:
        throw new Error("Resize : bad parameter");
    }
  }
  selectHandle(point: Point, handler: string) {
    this.selected = true;
    this.resizing = true;
    switch (handler) {
      case "topLeft":
        this.offset = substract(point, this.startPoint);
        this.handlerSelected = handler;
        break;
      case "bottomRight":
        this.offset = substract(point, this.endPoint);
        this.handlerSelected = handler;
        break;
      case "topRight":
        this.offset = substract(
          point,
          new Point(this.endPoint.x, this.startPoint.y)
        );
        this.handlerSelected = handler;
        break;
      case "bottomLeft":
        this.offset = substract(
          point,
          new Point(this.startPoint.x, this.endPoint.y)
        );
        this.handlerSelected = handler;
        break;
    }
  }
}
