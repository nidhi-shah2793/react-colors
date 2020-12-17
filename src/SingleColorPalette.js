import React, { useState } from "react";
import ColorBox from "./ColorBox";

function SingleColorPalette({ palette, colorId }) {
  const [colorFormat, setColorFormat] = useState("hex");

  const gatherShades = () => {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }
    return shades.slice(1);
  };

  let shades = gatherShades();
  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      colorId={color.id}
      color={color[colorFormat]}
      name={color.name}
      paletteId={palette.id}
      showLink={false}
    />
  ));

  return (
    <div className="Palette">
      <div className="Palette__colors">{colorBoxes}</div>
    </div>
  );
}

export default SingleColorPalette;
