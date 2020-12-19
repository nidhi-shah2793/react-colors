import React from "react";
import { useParams } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";

function PaletteGen({ palettes }) {
  const { paletteId } = useParams();

  const foundPalette = palettes.find(function (palette) {
    return palette.id === paletteId;
  });

  return <Palette palette={generatePalette(foundPalette)} />;
}

export default PaletteGen;
