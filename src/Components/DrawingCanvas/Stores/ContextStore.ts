import { Point } from "../Classes";

const ContextStore = (() => {
  let _canvasId = "MyCanvas";
  let _canvasCoords = new Point(0, 0);
  let _contextIsTranslating = false;
  let _contextTranslateOffset = new Point(0, 0);
  let _contextCoords = new Point(0, 0);
  let _canvasWidth = 800;
  let _canvasHeight = 500;

  const Store = {
    setCanvasId: (id: string) => {
      _canvasId = id;
    },
    getCanvasId: () => {
      return _canvasId;
    },
    get2DContext: () => {
      const context = document.getElementById(_canvasId) as HTMLCanvasElement;
      if (context) {
        return context.getContext("2d");
      } else {
        throw new Error("Canvas not found / accessible");
      }
    },
    getCanvasCoords: () => {
      return new Point(_canvasCoords.x, _canvasCoords.y);
    },
    setCanvasCoords: (x: number, y: number) => {
      _canvasCoords = { ..._canvasCoords, x: x, y: y };
    },
    isTranslating: () => _contextIsTranslating,
    setTranslating: (value: boolean) => {
      _contextIsTranslating = value;
    },
    getContextOffset: () => {
      return new Point(_contextTranslateOffset.x, _contextTranslateOffset.y);
    },
    setContextOffset: (x: number, y: number) => {
      _contextTranslateOffset = { ..._contextTranslateOffset, x: x, y: y };
    },
    getContextCoords: () => {
      return new Point(_contextCoords.x, _contextCoords.y);
    },
    setContextCoords: (x: number, y: number) => {
      _contextCoords = { ..._contextCoords, x: x, y: y };
    },
    getCanvasDimensions: () => ({ width: _canvasWidth, height: _canvasHeight }),
    setCanvasDimensions: (width: number, height: number) => {
      _canvasWidth = width;
      _canvasHeight = height;
    },
  };
  return Object.freeze(Store);
})();

export default ContextStore;
