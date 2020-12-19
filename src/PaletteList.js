import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: "blue",
    minHeight: "100vh",
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: "2rem",
  },
  container: {
    width: "50%",
    minHeight: "100vh",
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
    height: "auto",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    // display: "grid",
    // gridTemplateColumns: "repeat(3,30%)",
    // gridGap: "5%",
    // paddingBottom: "10rem",
  },
};

function PaletteList({ classes, palettes }) {
  const msg = palettes.map((palette) => (
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
