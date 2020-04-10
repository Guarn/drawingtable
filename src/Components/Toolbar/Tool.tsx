import React from "react";
import * as S from "./Styled";
import { ReactComponent as Cursor } from "../../assets/Cursor.svg";
//import { ReactComponent as Pen } from "../../assets/Pen.svg";
//import { ReactComponent as Move } from "../../assets/Move.svg";
import { ReactComponent as Rectangle } from "../../assets/Rectangle.svg";
import { ToolType } from "../DrawingCanvas/Classes/Types";

export interface ToolI {
  type: ToolType;
  selected: boolean;
  onChange: (val: ToolType) => void;
}

const { RECTANGLE, SELECT } = ToolType;

const Tool: React.FC<ToolI> = ({ type, selected, onChange }) => {
  return (
    <S.ButtonTool selected={selected} onClick={() => onChange(type)}>
      {type === SELECT && <Cursor height="1.5em" />}
      {/*type === "pen" && <Pen height="1.5em" />*/}
      {/*type === "move" && <Move height="1.5em" />*/}
      {type === RECTANGLE && <Rectangle height="1.5em" />}
    </S.ButtonTool>
  );
};
export default Tool;
