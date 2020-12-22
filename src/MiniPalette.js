import React from "react";
import { withStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
    },
    marginBottom: "5%",
    width: "30%",
    height: "200px",
    // until sm
    "@media (max-width: 767.98px)": {
      width: "100%",
      marginBottom: "15%",
    },
    // between sm and md
    "@media (min-width:767.98px) and (max-width: 991.98px)": {
      width: "40%",
      marginBottom: "10%",
    },
    // between md and lg
    "@media (min-width:991.98px) and (max-width: 1199.98px)": {
      width: "30%",
    },
  },
  colors: {
    backgroundColor: "white",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 1rem",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0",
    marginTop: "0",
    position: "relative",
    marginBottom: "-4.5px",
  },
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    borderRadius: "2px",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0",
    top: "0",
    padding: "10px",
    zIndex: "1",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
};

function MiniPalette({
  colors,
  emoji,
  id,
  paletteName,
  classes,
  deletePalette,
}) {
  const history = useHistory();

  const goToPalette = () => {
    history.push(`/palettes/${id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deletePalette(paletteName);
  };

  const miniColorBoxes = colors.map((color) => (
    <div
      key={color.name}
      className={classes.miniColor}
      style={{ background: color.color }}
    ></div>
  ));

  return (
    <div className={classes.root} onClick={goToPalette}>
      <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
