import React, { useState, useEffect } from "react";
import Toolbar from "./Components/Toolbar";
import { ConteneurGlobal } from "./Components/Toolbar/Styled";
import DrawingCanvas from "./Components/DrawingCanvas";
import { ToolType } from "./Components/DrawingCanvas/Classes/Types";
import { Point } from "./Components/DrawingCanvas/Classes";

function App() {
  const [tool, setTool] = useState<ToolType>(ToolType.RECTANGLE);

  const handleChange = (value: ToolType) => {
    setTool(value);
  };

  return (
    <ConteneurGlobal>
      <Toolbar value={tool} onChange={handleChange} />
      <DrawingCanvas tool={tool} />
    </ConteneurGlobal>
  );
}

export default App;
