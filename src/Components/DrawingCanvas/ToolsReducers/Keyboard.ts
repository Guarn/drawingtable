import { ToolType } from "../Classes/Types";
import { ItemsStore, ContextStore } from "../Stores";
import { clearAndDrawAll } from "../Utils/Drawing";
import { Point } from "../Classes";

const { getSelected, removeItem, deselectAll, updateItem } = ItemsStore;
const { get2DContext, setTranslating } = ContextStore;

const Keyboard = (event: KeyboardEvent, tool: ToolType) => {
  const { found, item } = getSelected();

  switch (event.code) {
    case "Space":
      if (event.type === "keydown") {
        setTranslating(true);
      } else {
        setTranslating(false);
      }
      break;
    case "Delete":
      found && removeItem(item!.id);
      clearAndDrawAll();
      break;
    case "Escape":
      deselectAll();
      clearAndDrawAll();
      break;
    case "ArrowLeft":
      if (event.type === "keydown" && item) {
        if (event.shiftKey) {
          item?.move(
            new Point(item.getStartPoint().x - 10, item.getStartPoint().y)
          );
        } else {
          item?.move(
            new Point(item.getStartPoint().x - 1, item.getStartPoint().y)
          );
        }
        updateItem(item);
        clearAndDrawAll();
      }
      break;
    case "ArrowRight":
      if (event.type === "keydown" && item) {
        if (event.shiftKey) {
          item?.move(
            new Point(item.getStartPoint().x + 10, item.getStartPoint().y)
          );
        } else {
          item?.move(
            new Point(item.getStartPoint().x + 1, item.getStartPoint().y)
          );
        }
        updateItem(item);
        clearAndDrawAll();
      }
      break;
    case "ArrowUp":
      if (event.type === "keydown" && item) {
        if (event.shiftKey) {
          item?.move(
            new Point(item.getStartPoint().x, item.getStartPoint().y - 10)
          );
        } else {
          item?.move(
            new Point(item.getStartPoint().x, item.getStartPoint().y - 1)
          );
        }
        updateItem(item);
        clearAndDrawAll();
      }
      break;
    case "ArrowDown":
      if (event.type === "keydown" && item) {
        if (event.shiftKey) {
          item?.move(
            new Point(item.getStartPoint().x, item.getStartPoint().y + 10)
          );
        } else {
          item?.move(
            new Point(item.getStartPoint().x, item.getStartPoint().y + 1)
          );
        }
        updateItem(item);
        clearAndDrawAll();
      }
      break;
    case "Backspace":
      get2DContext()?.setTransform(1, 0, 0, 1, 0, 0);
      clearAndDrawAll();
      break;
    case "KeyF":
      if (event.type === "keydown") {
        let start: any = null;
        function step(timestamp: any) {
          var progress;
          if (start === null) start = timestamp;
          progress = timestamp - start;
          const { a, d } = get2DContext()!.getTransform();

          get2DContext()?.setTransform(
            a + progress / 10000,
            0,
            0,
            d + progress / 10000,
            0,
            0
          );
          clearAndDrawAll();

          if (progress < 100) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      }
      break;
    case "KeyG":
      if (event.type === "keydown") {
        let start: any = null;
        function step(timestamp: any) {
          var progress;
          if (start === null) start = timestamp;
          progress = timestamp - start;
          const { a, d } = get2DContext()!.getTransform();

          get2DContext()?.setTransform(
            a - progress / 10000,
            0,
            0,
            d - progress / 10000,
            0,
            0
          );
          clearAndDrawAll();

          if (progress < 100) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      }
  }
};

export default Keyboard;
