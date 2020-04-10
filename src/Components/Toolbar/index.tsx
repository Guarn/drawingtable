import React from "react";
import * as S from "./Styled";
import Tool from "./Tool";
import { ToolType } from "../DrawingCanvas/Classes/Types";

export interface ToolbarI {
  value: ToolType;
  onChange: (val: ToolType) => void;
}

const Toolbar: React.FC<ToolbarI> = ({ value, onChange }) => {
  const handleChange = (val: ToolType) => {
    onChange(val);
  };
  return (
    <S.Toolbar>
      <Tool
        type={ToolType.SELECT}
        selected={value === ToolType.SELECT}
        onChange={handleChange}
      />
      <Tool
        type={ToolType.RECTANGLE}
        selected={value === ToolType.RECTANGLE}
        onChange={handleChange}
      />
    </S.Toolbar>
  );
};
export default Toolbar;
