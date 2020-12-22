import React from "react";
import "./Footer.css";

function Footer({ palette }) {
  return (
    <div>
      <div className="Footer">
        <div className="Footer__info">
          Answer to all "Tell me what color this is?" questions
        </div>
        <div>
          {palette.paletteName}
          <span className="Footer__emoji">{palette.emoji}</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
