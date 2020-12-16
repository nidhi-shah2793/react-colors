import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox key={color.id} color={color.hex} name={color.name} />
  ));

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <Slider
        defaultValue={level}
        step={100}
        min={100}
        max={900}
        onAfterChange={changeLevel}
      />
      <div className="Palette__colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
