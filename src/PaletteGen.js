import React from "react";
import { useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import { seedColors } from "./seedColors";
import Palette from "./Palette";

function PaletteGen() {
  const { paletteId } = useParams();

  const foundPalette = seedColors.find(function (palette) {
    return palette.id === paletteId;
  });

  return <Palette palette={generatePalette(foundPalette)} />;
}

export default PaletteGen;
