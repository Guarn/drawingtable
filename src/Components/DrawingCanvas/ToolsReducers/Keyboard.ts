const Keyboard = (event: KeyboardEvent) => {};

export default Keyboard;

/*  const keyPressHandle = (event: KeyboardEvent) => {
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
  };*/
