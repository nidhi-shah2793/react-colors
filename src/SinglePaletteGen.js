import React from "react";
import { useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import { seedColors } from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";

function SinglePaletteGen() {
  const { paletteId, colorId } = useParams();

  const foundPalette = seedColors.find(function (palette) {
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
