import React from "react";
import "./CreateColorBox.css";

function CreateColorBox({ name, color }) {
  return (
    <div className="CreateColorBox" style={{ backgroundColor: color }}>
      {name}
    </div>
  );
}

export default CreateColorBox;
