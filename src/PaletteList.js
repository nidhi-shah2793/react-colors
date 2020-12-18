import React from "react";
import { seedColors } from "./seedColors";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "space-evenly",
    justifyContent: "flex-start",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
};

function PaletteList({ classes }) {
  const msg = seedColors.map((palette) => (
    <MiniPalette key={palette.id} {...palette} />
  ));
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palettes/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>{msg}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
