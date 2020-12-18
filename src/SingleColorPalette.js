import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function SingleColorPalette({ palette, colorId }) {
  const [colorFormat, setColorFormat] = useState("hex");
  const [level, setLevel] = useState(500);

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const handleFormatChange = (format) => {
    setColorFormat(format);
  };

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
    <div className="SingleColorPalette Palette">
      <Navbar
        showSlider={false}
        changeLevel={changeLevel}
        level={level}
        handleFormatChange={handleFormatChange}
      />
      <div className="Palette__colors">
        {colorBoxes}
        <div className="Palette__goBack ColorBox">
          <Link to={`/palettes/${palette.id}`} className="ColorBox__backButton">
            GO BACK!
          </Link>
        </div>
      </div>
      <Footer palette={palette} />
    </div>
  );
}

export default SingleColorPalette;
