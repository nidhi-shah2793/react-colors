import React from "react";
import { useParams } from "react-router-dom";

import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";

function SinglePaletteGen({ palettes }) {
  const { paletteId, colorId } = useParams();

  const foundPalette = palettes.find(function (palette) {
    return palette.id === paletteId;
  });

  return (
    <div>
      <SingleColorPalette
        palette={generatePalette(foundPalette)}
        colorId={colorId}
      />
    </div>
  );
}

export default SinglePaletteGen;
