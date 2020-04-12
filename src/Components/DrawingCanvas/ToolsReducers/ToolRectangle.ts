import ItemsStore from "../Stores/ItemsStore";
import { Rectangle, Point } from "../Classes";
import { getRealPoint } from "../Utils/Coords";
import { clearAndDrawAll } from "../Utils/Drawing";
import { ContextStore } from "../Stores";

const { getContextCoords } = ContextStore;
const { substract } = Point;
const { addItem, selectLastItemAdded, getSelected, updateItem } = ItemsStore;

const ToolRectangle = (event: KeyboardEvent | React.MouseEvent) => {
  const { clientX, clientY } = (event as React.MouseEvent) || undefined;

  switch (event.type) {
    case "mousedown":
      const startPoint = getRealPoint(clientX, clientY);
      addItem(
        new Rectangle(
          substract(startPoint, getContextCoords()),
          substract(startPoint, getContextCoords())
        )
      );
      selectLastItemAdded();
      clearAndDrawAll();

      break;
    case "mousemove":
      const itemMoved = getSelected().item as Rectangle;
      if (itemMoved && itemMoved.isMoving()) {
        itemMoved.setPoints(
          undefined,
          substract(getRealPoint(clientX, clientY), getContextCoords())
        );
        updateItem(itemMoved);
        clearAndDrawAll();
      }
      break;
    case "mouseup":
      const itemStop = getSelected().item as Rectangle;
      itemStop.deselect();
      updateItem(itemStop);
      clearAndDrawAll();
      break;

    default:
      break;
  }
};

export default ToolRectangle;
