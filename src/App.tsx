import React, { useState } from "react";
import Toolbar from "./Components/Toolbar";
import { ConteneurGlobal } from "./Components/Toolbar/Styled";
import DrawingCanvas from "./Components/DrawingCanvas";

function App() {
  const [tool, setTool] = useState("rectangle");

  const handleChange = (value: string) => {
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
