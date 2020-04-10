const MouseMoveReducer = (event: React.MouseEvent) => {
  const { clientX, clientY } = event;
};

export default MouseMoveReducer;

/*  const stopMovingHandle = (event: React.MouseEvent) => {
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
  };*/
