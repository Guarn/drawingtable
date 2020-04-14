import ContextStore from "../Stores/ContextStore";
import { clearAndDrawAll } from "../Utils/Drawing";
import { Point } from "../Classes";
import { getRealPoint } from "../Utils/Coords";

const { substract, add } = Point;
const { get2DContext } = ContextStore;
let sc = 1;
let oldSc = 1;
const pas = 0.1;
let moving = false;
let top = 0;
let left = 0;
const Zoom = (event: React.WheelEvent) => {
  switch (event.deltaY) {
    case 100:
      if (!moving) {
        drawZoom("unzoom", getRealPoint(event.clientX, event.clientY));
      }
      break;
    case -100:
      if (!moving) {
        drawZoom("zoom", getRealPoint(event.clientX, event.clientY));
      }
      break;
  }
};

export default Zoom;

const drawZoom = (direction: string, point: Point) => {
  moving = false;
  const { a, d, e, f } = get2DContext()!.getTransform();

  // let start: number | null = null;
  console.log(get2DContext()?.getTransform());

  console.log("Click", point.x, point.y);

  left = point.x * a - point.x * (a + (direction === "zoom" ? pas : -pas));
  top = point.y * d - point.y * (a + (direction === "zoom" ? pas : -pas));
  console.log("Decal", left, top);

  get2DContext()?.setTransform(
    a + (direction === "zoom" ? pas : -pas),
    0,
    0,
    d + (direction === "zoom" ? pas : -pas),
    left + e,
    top + f
  );

  clearAndDrawAll();

  /*
  function step(timestamp: number) {
    var progress;
    let newPX = (point.x / sc) * (direction === "zoom" ? sc + pas : sc - pas);
    let newPY = (point.y / sc) * (direction === "zoom" ? sc + pas : sc - pas);
    const newPoint = new Point(newPX, newPY);
    const translate = substract(point, newPoint);
    console.log("OldPoint", point);
    console.log("newPoint", newPoint);
    console.log("translate", translate);

    if (start === null) start = timestamp;
    const { a, d, e, f } = get2DContext()!.getTransform();
    progress = timestamp - start;
    let percent = (pas * progress) / 100;
    percent = Math.floor(percent * 100) / 100;
    let decalX =
      ((point.x * pas * progress) / 100) * (direction === "zoom" ? -1 : 1);
    let decalY =
      ((point.y * pas * progress) / 100) * (direction === "zoom" ? -1 : 1);
    console.log(decalX);

    //get2DContext()!.translate(point.x, point.y);
    get2DContext()?.setTransform(
      direction === "zoom" ? sc + percent : sc - percent,
      0,
      0,
      direction === "zoom" ? sc + percent : sc - percent,
      translate.x,
      translate.y
    );
    /*get2DContext()!.scale(
      direction === "zoom" ? 1 + percent : 1 - percent,

      direction === "zoom" ? 1 + percent : 1 - percent
    );*/
  // get2DContext()!.translate(-point.x, -point.y);
  /*
    clearAndDrawAll();

    if (progress < 100) {
      requestAnimationFrame(step);
    } else {
      console.log("SC");
      moving = false;
      sc = direction === "zoom" ? sc + pas : sc - pas;
    }*/
};

// requestAnimationFrame(step);
//};
