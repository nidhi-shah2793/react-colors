import React from "react";
import "./ColorBox.css";

function ColorBox({ name, color }) {
  return (
    <div style={{ background: color }} className="ColorBox">
      <div className="ColorBox__copy">
        <div className="ColorBox__colorName">
          <span>{name}</span>
        </div>
        <button className="ColorBox__copyButton">Copy</button>
      </div>

      <span className="ColorBox__more">More</span>
    </div>
  );
}

export default ColorBox;
