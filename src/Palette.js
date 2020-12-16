import React from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";

function Palette({ paletteName, id, emoji, colors }) {
  const colorBoxes = colors.map((color) => (
    <ColorBox color={color.color} name={color.name} />
  ));

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <div className="Palette__colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
