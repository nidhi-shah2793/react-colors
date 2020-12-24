import React from "react";

import { SortableContainer } from "react-sortable-hoc";

import CreateColorBox from "./CreateColorBox";

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {colors.map((color, i) => (
        <CreateColorBox
          index={i}
          key={color.name}
          {...color}
          deleteColor={deleteColor}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
