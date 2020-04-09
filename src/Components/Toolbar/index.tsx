import React from "react";
import * as S from "./Styled";
import Tool from "./Tool";

export interface ToolbarI {
  value: string;
  onChange: (val: string) => void;
}

const Toolbar: React.FC<ToolbarI> = ({ value, onChange }) => {
  const handleChange = (val: string) => {
    onChange(val);
  };
  return (
    <S.Toolbar>
      <Tool
        type="select"
        selected={value === "select"}
        onChange={handleChange}
      />
      <Tool type="pen" selected={value === "pen"} onChange={handleChange} />
      <Tool type="move" selected={value === "move"} onChange={handleChange} />
      <Tool
        type="rectangle"
        selected={value === "rectangle"}
        onChange={handleChange}
      />
    </S.Toolbar>
  );
};
export default Toolbar;
