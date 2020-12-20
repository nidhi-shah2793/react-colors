import React from "react";
import "./CreateColorBox.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

const CreateColorBox = SortableElement(({ name, color, deleteColor }) => {
  const handleDelete = () => {
    deleteColor(name);
  };
  return (
    <div className="CreateColorBox" style={{ backgroundColor: color }}>
      <div>
        <span className="CreateColorBox__colorName">{name}</span>
        <span className="CreateColorBox__delete">
          <DeleteIcon onClick={handleDelete} />
        </span>
      </div>
    </div>
  );
});

export default CreateColorBox;
