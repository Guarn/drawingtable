import { Shape, Point } from "../Classes";
import { deepClone } from "../Utils/DeepClone";

const ItemsStore = (() => {
  let _itemsList: Shape[] = [];
  let _selectedId = "";

  const Store = {
    getItemsList: () => _itemsList.map((v) => deepClone(v)),
    addItem: (item: Shape) => (_itemsList = [..._itemsList, deepClone(item)]),
    removeItem: (id: string) => {
      _itemsList = _itemsList.filter((v) => v.id !== id);
      _selectedId = id === _selectedId ? "" : _selectedId;
    },
    updateItem: (item: Shape) => {
      _itemsList = _itemsList.map((el) =>
        el.id === item.id ? deepClone(item) : deepClone(el)
      );
    },
    getSelected: ():
      | { found: false; item: undefined }
      | { found: true; item: Shape } => {
      const selectedItem = _itemsList.filter((el) => el.id === _selectedId);
      return selectedItem.length === 1
        ? { found: true, item: deepClone(selectedItem[0]) }
        : { found: false, item: undefined };
    },
    setSelected: (id: string, offsetPoint: Point) => {
      const selectedItem = _itemsList.filter((el) => el.id === id);
      if (selectedItem.length === 1) {
        selectedItem[0].select(offsetPoint);
        _selectedId = selectedItem[0].id;
      } else {
        throw new Error("This ID doesn't exist.");
      }
    },
    deselectAll: () => {
      _itemsList.map((v) => v.deselect());
      _selectedId = "";
    },

    /**
     * Usefull at the creation of a new Rectangle,
     *  automatically select good ID and setMoving of that object.
     */
    selectLastItemAdded: () => {
      _selectedId = _itemsList[_itemsList.length - 1].id;
      Store.setSelected(_selectedId, new Point(0, 0));
      _itemsList[_itemsList.length - 1].setMoving(true);
    },
  };

  return Object.freeze(Store);
})();

export default ItemsStore;
