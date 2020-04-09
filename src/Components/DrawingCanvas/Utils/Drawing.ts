import { ContextStore } from "../Stores";
import { ItemsStore } from "../Stores";

const { get2DContext, getCanvasDimensions } = ContextStore;
const { getItemsList, getSelected } = ItemsStore;

export const clearDrawArea = () => {
  const ctx = get2DContext();
  const { width, height } = getCanvasDimensions();
  ctx?.clearRect(0, 0, width, height);
};

export const drawItemsList = () => {
  getItemsList().map((item) => item.draw());
};

export const drawSelected = () => {
  const { item, found } = getSelected();
  if (found) {
    item?.draw();
    item?.drawHandlers();
  }
};
