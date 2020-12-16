import React from "react";
import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[4]} palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
