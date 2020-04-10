const MouseMoveReducer = (event: React.MouseEvent) => {
  const { clientX, clientY } = event;
};

export default MouseMoveReducer;

/*const mouseMoveHandle = (event: React.MouseEvent) => {
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
  };*/
