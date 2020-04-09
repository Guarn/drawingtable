import { Point, Rectangle } from ".";

export default class State {
  private static stateInstance: State;
  itemsList: Rectangle[] = [];
  selectedId: number = -1;
  canvasCoords: Point = new Point(0, 0);
  handlersRadius: number = 8;
  canvasId: string = "MyCanvas";
  contextCoords = new Point(0, 0);
  contextTranslating = false;
  translateOffset = new Point(0, 0);
  private constructor() {}

  static getStateInstance(): State {
    if (State.stateInstance === undefined) {
      State.stateInstance = new State();
    }
    return State.stateInstance;
  }
  /**
   * Use the id to get canvasRef and calculate canvasCoords.
   *
   * @param canvasName Id from the canvas element
   */
  setCanvasId(canvasName: string) {
    State.stateInstance.canvasId = canvasName;
    State.stateInstance.setCanvasCoords();
  }

  private setCanvasCoords() {
    const { x, y } = document
      .getElementById(this.canvasId)!
      .getBoundingClientRect();
    State.stateInstance.canvasCoords = new Point(x, y);
  }

  /**
   * Substract canvas coords from a point
   *
   * @param point
   */
  getRealPoint(point: Point): Point;
  getRealPoint(x: number, y: number): Point;
  getRealPoint(x: Point | number, y?: number) {
    if (x instanceof Point) {
      return new Point(
        x.x - State.stateInstance.canvasCoords.x,
        x.y - State.stateInstance.canvasCoords.y
      );
    }
    if (y) {
      return new Point(
        x - State.stateInstance.canvasCoords.x,
        y - State.stateInstance.canvasCoords.y
      );
    }
  }

  getContext() {
    let context = document.getElementById(
      State.stateInstance.canvasId
    ) as HTMLCanvasElement;
    return context.getContext("2d");
  }
}
