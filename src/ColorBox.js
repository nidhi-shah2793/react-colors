import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ColorBox({ name, color }) {
  const [copied, setCopied] = useState(false);

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
        <div className={`ColorBox__overlayMessage ${copied ? "show" : ""}`}>
          <h1>COPIED!</h1>
          <p>{color}</p>
        </div>
        <div className="ColorBox__copyContainer">
          <div className="ColorBox__colorName">
            <span>{name}</span>
          </div>
          <button className="ColorBox__copyButton">Copy</button>
        </div>
        <span className="ColorBox__more">More</span>
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
