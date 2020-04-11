import ItemsStore from "../Stores/ItemsStore";
import { Rectangle, Point } from "../Classes";
import { getRealPoint } from "../Utils/Coords";
import { clearAndDrawAll, drawSelected } from "../Utils/Drawing";

const { substract } = Point;
const {
  addItem,
  selectLastItemAdded,
  getItemsList,
  setSelected,
  getSelected,
  updateItem,
  deselectAll,
} = ItemsStore;

const ToolSelect = (event: KeyboardEvent | React.MouseEvent) => {
  const { clientX, clientY } = (event as React.MouseEvent) || undefined;
  const eventPoint = getRealPoint(clientX, clientY);

  switch (event.type) {
    case "mousedown":
      // Calculates possible selectables items on this Point.
      const selectableTargets = getItemsList().filter((el) =>
        el.isPointIn(eventPoint)
      );

      // Store the last draw item.
      const lastItem = selectableTargets[selectableTargets.length - 1] || null;

      // If more than an item are found, select the last item drew.
      if (selectableTargets.length > 0) {
        setSelected(lastItem.id, eventPoint);
        drawSelected();
      } else {
        deselectAll();
        clearAndDrawAll();
        return;
      }

      // If selected item, was the click on a handler ?
      if (lastItem) {
        const handler = lastItem.isHandleSelected(eventPoint);
        if (handler.found) {
          //If yes,
          lastItem.selectHandle(eventPoint, handler.handler);
        } else {
          // it's just a normal select click
          lastItem.setMoving(true);
          lastItem.select(substract(eventPoint, lastItem.getStartPoint()));
        }
        updateItem(lastItem);
        clearAndDrawAll();
      }

      break;

    case "mousemove":
      const selectedItem =
        getSelected().found && getSelected().item?.isMoving()
          ? (getSelected().item as Rectangle)
          : null;
      if (selectedItem) {
        selectedItem.move(eventPoint);
        updateItem(selectedItem);
        clearAndDrawAll();
      }

      break;
    case "mouseup":
      if (getSelected().found) {
        getSelected().item?.setMoving(false);
        getSelected().item?.setResizing(false);
      }
      break;

    default:
      break;
  }
};

export default ToolSelect;
