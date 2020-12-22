import React from "react";
import "./CreateColorBox.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";

const CreateColorBox = SortableElement(({ name, color, deleteColor }) => {
  const isTooDark = chroma(color).luminance() <= 0.5;
  let adjustedColor = isTooDark ? "white" : "black";

  const handleDelete = () => {
    deleteColor(name);
  };
  return (
    <div className="CreateColorBox" style={{ backgroundColor: color }}>
      <div>
        <span
          className="CreateColorBox__colorName"
          style={{ color: adjustedColor }}
        >
          {name}
        </span>
        <span className="CreateColorBox__delete">
          <DeleteIcon onClick={handleDelete} />
        </span>
      </div>
    </div>
  );
});

export default CreateColorBox;
