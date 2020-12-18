import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Palette({ palette }) {
  const [level, setLevel] = useState(500);
  const [colorFormat, setColorFormat] = useState("hex");

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const handleFormatChange = (format) => {
    setColorFormat(format);
  };

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      key={color.id}
      colorId={color.id}
      color={color[colorFormat]}
      name={color.name}
      paletteId={palette.id}
      showLink={true}
    />
  ));

  return (
    <div className="Palette">
      <Navbar
        showSlider={true}
        changeLevel={changeLevel}
        level={level}
        handleFormatChange={handleFormatChange}
      />
      <div className="Palette__colors">{colorBoxes}</div>
      <Footer palette={palette} />
    </div>
  );
}

export default Palette;
