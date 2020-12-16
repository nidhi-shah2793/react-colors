import React from "react";

function Palette({ paletteName, id, emoji, colors }) {
  return (
    <div className="Palette">
      <h1>{paletteName}</h1>
      {/* Navbar goes here */}
      <div className="Palette__colors">{/* color boxes */}</div>
      {/* footer */}
    </div>
  );
}

export default Palette;
