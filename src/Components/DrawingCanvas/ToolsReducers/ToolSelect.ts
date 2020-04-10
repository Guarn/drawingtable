import ItemsStore from "../Stores/ItemsStore";
import { Rectangle, Point } from "../Classes";
import { getRealPoint } from "../Utils/Coords";
import { clearAndDrawAll } from "../Utils/Drawing";

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
      const lastItem = selectableTargets[selectableTargets.length - 1] || null;

      // If more than an item are found, select the last item drew.
      if (selectableTargets.length > 0) {
        setSelected(lastItem.id, eventPoint);
      } else {
        deselectAll();
        clearAndDrawAll();
        return;
      }

      if (lastItem) {
        const handler = lastItem.isHandleSelected(eventPoint);
        if (handler.found) {
          lastItem.selectHandle(eventPoint, handler.handler);
          updateItem(selectableTargets[selectableTargets.length - 1]);
        }
      }
      console.log(getSelected().item!.id);

      break;

    case "mousemove":
      break;
    case "mouseup":
      break;

    default:
      break;
  }
};

export default ToolSelect;
