import React, { useState } from "react";
import { Link } from "react-router-dom";

import PaletteNameDialog from "./PaletteNameDialog";
import { DRAWER_WIDTH as drawerWidth } from "./constants";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    marginTop: "0",
    height: "8vh",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "@media (max-width: 575.98px)": {
      marginRight: "0",
    },
  },
  hide: {
    display: "none",
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "0",
    },
    "@media (max-width: 575.98px)": {
      marginRight: "5px",
    },
  },
  btn: {
    margin: "0 0.5rem",
    "@media (max-width: 991.98px)": {
      margin: "0.2rem",
      padding: "0.3rem",
    },
    "@media (max-width: 575.98px)": {
      fontSize: "8px",
      padding: "0.1rem",
      margin: "0",
    },
  },
  navTitle: {
    "@media (max-width: 991.98px)": {
      fontSize: "1rem",
    },
  },
}));

function NewPaletteFormNav({
  palettes,
  savePalette,
  colors,
  open,
  handleDrawerOpen,
}) {
  const classes = useStyles();

  const [formStage, setFormStage] = useState("");

  const handleClickOpen = () => {
    setFormStage("paletteName");
  };

  const handleClose = () => {
    setFormStage("");
  };

  const handleStageChange = () => {
    setFormStage("emoji");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.navTitle}>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button className={classes.btn} variant="contained" color="default">
              Go Back
            </Button>
          </Link>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formStage ? (
        <PaletteNameDialog
          palettes={palettes}
          savePalette={savePalette}
          colors={colors}
          handleClose={handleClose}
          formStage={formStage}
          handleStageChange={handleStageChange}
        />
      ) : undefined}
    </div>
  );
}

export default NewPaletteFormNav;
