/**
 * Class Point
 * @param x : number
 * @param y : number
 */
export default class Point {
  x: number;
  y: number;

  constructor();
  constructor(xy: [number, number]);
  constructor(x: number, y: number);
  constructor(x?: number | [number, number], y?: number) {
    if (typeof x === "number" && typeof y === "number") {
      this.x = x;
      this.y = y;
    } else if (x instanceof Array) {
      this.x = x[0];
      this.y = x[1];
    } else {
      this.x = 0;
      this.y = 0;
    }
  }

  /**
   * **Points Addition**
   * ******************
   * @static
   *
   * @method (Point,Point) => simple addition
   * @method (Point,number) => add number to *x* and *y*
   * @method (Point,[number1,number2]) => add number1 to *x* and number2 to *y*
   * @param [pointA] Point
   * @param [pointB] Point | number
   * @param [pointC] number
   * @returns Point */
  static add(pointA: Point, pointB: Point): Point;
  static add(pointA: Point, numberToAdd: number): Point;
  static add(pointA: Point, pointArray: [number, number]): Point;
  static add(pointA: Point, pointB: Point | number | [number, number]): Point {
    if (pointB instanceof Point) {
      return new Point(pointA.x + pointB.x, pointA.y + pointB.y);
    }
    if (typeof pointB === "number") {
      return new Point(pointA.x + pointB, pointA.y + pointB);
    }
    if (pointB instanceof Array) {
      return new Point(pointA.x + pointB[0], pointA.y + pointB[1]);
    } else {
      throw new Error(
        "Bad parameters of pointB : only Point, number and [number,number] authorized"
      );
    }
  }
  /**
   * **Points Substraction**
   * ******************
   * @static
   *
   * @method (Point,Point) => simple substraction
   * @method (Point,number) => substract number from *x* and *y*
   * @method (Point,[number1,number2]) => substract number1 from *x* and number2 from *y*
   * @param [pointA] Point
   * @param [pointB] Point | number
   * @param [pointC] number
   * @returns Point */
  static substract(pointA: Point, pointB: Point): Point;
  static substract(pointA: Point, numberToAdd: number): Point;
  static substract(pointA: Point, pointArray: [number, number]): Point;
  static substract(
    pointA: Point,
    pointB: Point | number | [number, number]
  ): Point {
    if (pointB instanceof Point) {
      return new Point(pointA.x - pointB.x, pointA.y - pointB.y);
    }
    if (typeof pointB === "number") {
      return new Point(pointA.x - pointB, pointA.y - pointB);
    }
    if (pointB instanceof Array) {
      return new Point(pointA.x - pointB[0], pointA.y - pointB[1]);
    } else {
      throw new Error(
        "Bad parameters of pointB, only authorized types : Point, number and [number,number]"
      );
    }
  }

  static getCenterPoint(pointA: Point, pointB: Point) {
    let tempPoint = this.substract(pointB, pointA);
    return new Point(pointA.x + tempPoint.x / 2, pointA.y + tempPoint.y / 2);
  }
}
