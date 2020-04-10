const MouseDownReducer = (event: React.MouseEvent) => {
  const { clientX, clientY } = event;
};

export default MouseDownReducer;

/*const mouseDownHandle = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;

    if (!isTranslating()) {
      if (tool === "rectangle") {
        getItemsList.push(
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
  };*/
