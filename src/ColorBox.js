import React from "react";
import "./ColorBox.css";

function ColorBox({ name, color }) {
  return (
    <div style={{ background: color }} className="ColorBox">
      <span>{name}</span>
      <span>MORE</span>
    </div>
  );
}

export default ColorBox;
