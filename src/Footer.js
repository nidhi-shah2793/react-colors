import React from "react";
import "./Footer.css";

function Footer({ palette }) {
  return (
    <div>
      <div className="Footer">
        {palette.paletteName}
        <span className="Footer__emoji">{palette.emoji}</span>
      </div>
    </div>
  );
}

export default Footer;
