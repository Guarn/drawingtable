import { ContextStore } from "../Stores";
import { ItemsStore } from "../Stores";

const { get2DContext, getCanvasDimensions, getContextCoords } = ContextStore;
const { getItemsList, getSelected } = ItemsStore;

export const clearDrawArea = () => {
  const ctx = get2DContext();
  const { width, height } = getCanvasDimensions();
  const { x, y } = getContextCoords();
  console.log(x, y);

  ctx?.clearRect(-x, -y, width, height);
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

export const clearAndDrawAll = () => {
  clearDrawArea();
  drawItemsList();
  drawSelected();
};
