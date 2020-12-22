import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import bg from "./bg.svg";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    backgroundColor: "#394bad",
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    backgroundSize: "cover",
    minHeight: "100vh",
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingBottom: "2rem",
  },
  container: {
    width: "65%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "space-evenly",
    justifyContent: "flex-start",
    marginTop: "1rem",
    // until sm
    "@media (max-width:767.98px)": {
      width: "60%",
    },
    // between sm and md
    "@media (min-width:767.98px) and (max-width: 991.98px)": {
      width: "70%",
    },
    // between md and lg
    "@media (min-width:991.98px) and (max-width: 1199.98px)": {
      width: "80%",
    },
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
    // until sm
    "@media (max-width:767.98px)": {
      flexWrap: "wrap",
      justifyContent: "center",
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
    marginTop: "2rem",
    // display: "grid",
    // gridTemplateColumns: "repeat(3,30%)",
    // gridGap: "5%",
    // paddingBottom: "10rem",
  },
  heading: {
    fontSize: "2rem",
    // until sm
    "@media (max-width:767.98px)": {
      fontSize: "1.5rem",
    },
  },
  createBtn: {
    backgroundColor: "#e9edf0",
    color: "#da4181",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e9edf0",
      color: "#da4181",
    },
  },
};

function PaletteList({ classes, palettes, deletePalette }) {
  const msg = palettes.map((palette) => (
    <MiniPalette key={palette.id} {...palette} deletePalette={deletePalette} />
  ));
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>ReactColorPicker</h1>
          <Link to="/palettes/new">
            <Button
              variant="contained"
              color="primary"
              className={classes.createBtn}
            >
              Create Palette
            </Button>
          </Link>
        </nav>
        <div className={classes.palettes}>{msg}</div>
      </div>
    </div>
  );
}

export default withStyles(styles)(PaletteList);
