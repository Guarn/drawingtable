import { ToolType } from "../Classes/Types";
import { ItemsStore, ContextStore } from "../Stores";
import { clearAndDrawAll } from "../Utils/Drawing";

const { getSelected, removeItem, deselectAll } = ItemsStore;
const { get2DContext } = ContextStore;

const Keyboard = (event: KeyboardEvent, tool: ToolType) => {
  console.log(event);

  const { found, item } = getSelected();
  switch (event.code) {
    case "Delete":
      found && removeItem(item!.id);
      clearAndDrawAll();
      break;
    case "Escape":
      deselectAll();
      clearAndDrawAll();
      break;
    case "ArrowLeft":
      if (event.type === "keydown") {
        get2DContext()?.translate(-10, 0);
        console.log(get2DContext()?.getTransform());
        clearAndDrawAll();
      }
      break;
    case "ArrowRight":
      if (event.type === "keydown") {
        get2DContext()?.translate(10, 0);
        console.log(get2DContext()?.getTransform());
        clearAndDrawAll();
      }
      break;
    case "ArrowUp":
      if (event.type === "keydown") {
        get2DContext()?.translate(0, -10);
        console.log(get2DContext()?.getTransform());
        clearAndDrawAll();
      }
      break;
    case "ArrowDown":
      if (event.type === "keydown") {
        get2DContext()?.translate(0, 10);
        console.log(get2DContext()?.getTransform());
        clearAndDrawAll();
      }
      break;
    case "Backspace":
      get2DContext()?.setTransform(1, 0, 0, 1, 0, 0);
      clearAndDrawAll();
  }
};

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
