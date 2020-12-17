import React from "react";
import { withStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import ColorBox from "./ColorBox";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
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
    margin: "0 auto",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
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
};

function MiniPalette({ colors, emoji, id, paletteName, classes }) {
  const history = useHistory();

  const goToPalette = () => {
    history.push(`/palettes/${id}`);
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
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
