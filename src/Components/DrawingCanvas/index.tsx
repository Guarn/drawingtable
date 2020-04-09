import React, { useRef, useEffect } from "react";
import { Canvas } from "./Styled";
import { Point, Rectangle } from "./Classes";
import State from "./Classes/State";
import GlobalStore from "./Classes/newState";

export interface DrawingCanvasI {
  tool: string;
}
const { substract } = Point;
const {
  addItem,
  getItemsList,
  updateItem,
  removeItem,
  setSelected,
  getSelected,
} = GlobalStore;

const DrawingCanvas = ({ tool }: DrawingCanvasI) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const state = State.getStateInstance();

  let {
    itemsList,
    selectedId,
    setCanvasId,
    getRealPoint,
    getContext,
    contextTranslating,
    translateOffset,
    contextCoords,
  } = state;
  const resetContext = (caller: string = "") => {
    const context = refCanvas.current?.getContext("2d");

    // console.log("Reset ! " + caller + " ||| selectedId : " + selectedId);

    context!.clearRect(0, 0, 800, 500);
    let ctx = getContext();
    ctx?.save();

    ctx!.translate(contextCoords.x, contextCoords.y);
    ctx?.beginPath();
    ctx!.fillStyle = "black";
    ctx!.lineWidth = 2;
    ctx?.fillRect(398, 0, 4, 500);
    itemsList.map((el) => {
      if (!el.isSelected()) {
        el.draw();
      }
      return null;
    });
    ctx?.restore();

    if (selectedId >= 0 && itemsList[selectedId].isSelected()) {
      let ctx = getContext();
      ctx?.save();
      ctx!.translate(contextCoords.x, contextCoords.y);

      itemsList[selectedId].draw();
      itemsList[selectedId].drawHandlers();
      const { startPoint, endPoint } = itemsList[selectedId];
      let middlePoint = Point.getCenterPoint(startPoint, endPoint);

      ctx!.fillStyle = "red";
      ctx?.arc(middlePoint.x, middlePoint.y, 5, 0, Math.PI * 2);
      ctx?.fill();
      ctx!.fillStyle = "green";
      ctx?.beginPath();
      ctx?.restore();
    }
  };

  useEffect(() => {
    addItem(new Rectangle());
    addItem(new Rectangle());
    addItem(new Rectangle());
    console.log(getItemsList());

    console.log(getSelected());
    setSelected(getItemsList()[0].id, new Point(3, 5));
    getSelected().found && removeItem(getSelected().item!.id);
    console.log(getSelected());
    console.log(getItemsList());

    setCanvasId("MyCanvas");
    itemsList.map((el) => {
      el.deselect();
      return null;
    });
    resetContext();
    document.addEventListener("keydown", keyPressHandle);
    document.addEventListener("keyup", keyUpHandle);
    return () => {
      document.removeEventListener("keydown", keyPressHandle);
    };
  });

  const mouseDownHandle = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    if (!contextTranslating) {
      if (tool === "rectangle") {
        itemsList.push(
          new Rectangle(
            getRealPoint(clientX, clientY),
            getRealPoint(clientX, clientY)
          )
        );
        selectedId = itemsList.length - 1;
        itemsList[selectedId].setMoving(true);

        resetContext("Event : MouseDown / Tool : rectangle");
      }

      if (tool === "select") {
        selectedId = -1;
        let candidats: number[] = [];
        itemsList.map((el, index) => {
          el.deselect();
          if (el.isPointIn(getRealPoint(clientX, clientY))) {
            candidats.push(index);
          }
          return null;
        });

        if (candidats.length > 0) {
          // The selected id is the last one (last painted).
          selectedId = candidats[candidats.length - 1];
          let handle = itemsList[selectedId].isHandleSelected(
            getRealPoint(clientX, clientY)
          );

          if (handle !== "") {
            itemsList[selectedId].selectHandle(
              getRealPoint(clientX, clientY),
              handle
            );
          } else {
            itemsList[selectedId].select(
              substract(
                getRealPoint(clientX, clientY),
                itemsList[selectedId].startPoint
              )
            );
            itemsList[selectedId].setMoving(true);
          }
        }
        resetContext("Event : MouseDown / Tool : rectangle");
      }
    } else {
      translateOffset = getRealPoint(clientX, clientY);
    }
  };

  const mouseMoveHandle = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    if (contextTranslating && event.buttons === 1) {
      contextCoords = substract(
        getRealPoint(clientX, clientY),
        translateOffset
      );

      resetContext();
    } else {
      if (
        tool === "rectangle" &&
        selectedId >= 0 &&
        itemsList[selectedId].isMoving()
      ) {
        resetContext("Event : MouseMove / Tool : rectangle");
        itemsList[selectedId].setPoints(
          undefined,
          getRealPoint(clientX, clientY)
        );
        itemsList[selectedId].draw();
      }
      if (
        tool === "select" &&
        selectedId >= 0 &&
        itemsList[selectedId].isMoving()
      ) {
        itemsList[selectedId].move(getRealPoint(clientX, clientY));
        resetContext("Event : MouseMove / Tool : select");
        console.log(translateOffset);
        console.log(contextCoords);
        console.log(selectedId);
      }
      if (
        tool === "select" &&
        selectedId >= 0 &&
        itemsList[selectedId].isResizing()
      ) {
        itemsList[selectedId].resize(getRealPoint(clientX, clientY));
        resetContext("Event : MouseMove / Tool : select");
      }
    }
  };

  const stopMovingHandle = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    if (
      selectedId >= 0 &&
      itemsList[selectedId].isMoving() &&
      tool === "rectangle"
    ) {
      itemsList[selectedId].setMoving(false);
      itemsList[selectedId].setPoints(
        undefined,
        getRealPoint(clientX, clientY)
      );
      resetContext();
    }
    if (
      selectedId >= 0 &&
      itemsList[selectedId].isMoving() &&
      tool === "select"
    ) {
      itemsList[selectedId].setMoving(false);
      resetContext(
        "Event : StopMove / Tool : select / Cond: id !== -1 && moving"
      );
    }
    if (
      selectedId >= 0 &&
      itemsList[selectedId].isResizing() &&
      tool === "select"
    ) {
      itemsList[selectedId].setResizing(false);
      resetContext(
        "Event : StopMove / Tool : select / Cond: id !== -1 && moving"
      );
    }
  };

  const keyPressHandle = (event: KeyboardEvent) => {
    if (event.key === "Delete" && selectedId !== -1) {
      itemsList.splice(selectedId, 1);
      selectedId = -1;
      resetContext();
    }
    if (event.key === "Escape" && selectedId !== -1) {
      itemsList[selectedId].deselect();
      selectedId = -1;
      resetContext();
    }
    if (event.code === "Space") {
      contextTranslating = true;
    }
  };

  const keyUpHandle = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      contextTranslating = false;
    }
  };

  return (
    <Canvas
      height="500"
      width="800"
      ref={refCanvas}
      id="MyCanvas"
      onMouseDown={mouseDownHandle}
      onMouseUp={stopMovingHandle}
      onMouseMove={mouseMoveHandle}
      onMouseLeave={stopMovingHandle}
    />
  );
};
export default DrawingCanvas;
