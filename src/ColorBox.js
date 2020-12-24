import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

import "./styles/ColorBox.css";

function ColorBox({ name, color, paletteId, colorId, showLink }) {
  //state
  const [copied, setCopied] = useState(false);

  //functions
  const isTooDark = chroma(color).luminance() <= 0.5;
  let adjustedColor = isTooDark ? "white" : "black";

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={color} onCopy={changeCopyState}>
      <div style={{ background: color }} className="ColorBox">
        <div
          style={{ background: color }}
          className={`ColorBox__overlay ${copied ? "show" : ""}`}
        />
        <div
          style={{ color: adjustedColor }}
          className={`ColorBox__overlayMessage ${copied ? "show" : ""}`}
        >
          <h1>COPIED!</h1>
          <p>{color}</p>
        </div>
        <div>
          <div className="ColorBox__colorName">
            <span style={{ color: adjustedColor }}>{name}</span>
          </div>
          <button
            style={{ color: adjustedColor }}
            className="ColorBox__copyButton"
          >
            Copy
          </button>
        </div>
        {showLink ? (
          <Link
            to={`/palettes/${paletteId}/${colorId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="ColorBox__more" style={{ color: adjustedColor }}>
              More
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
