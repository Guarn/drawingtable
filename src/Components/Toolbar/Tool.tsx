import React from "react";
import * as S from "./Styled";
import { ReactComponent as Cursor } from "../../assets/Cursor.svg";
import { ReactComponent as Pen } from "../../assets/Pen.svg";
import { ReactComponent as Move } from "../../assets/Move.svg";
import { ReactComponent as Rectangle } from "../../assets/Rectangle.svg";

export interface ToolI {
  type: "select" | "pen" | "move" | "rectangle";
  selected: boolean;
  onChange: (val: string) => void;
}

const Tool: React.FC<ToolI> = ({ type, selected, onChange }) => {
  return (
    <S.ButtonTool selected={selected} onClick={() => onChange(type)}>
      {type === "select" && <Cursor height="1.5em" />}
      {type === "pen" && <Pen height="1.5em" />}
      {type === "move" && <Move height="1.5em" />}
      {type === "rectangle" && <Rectangle height="1.5em" />}
    </S.ButtonTool>
  );
};
export default Tool;
