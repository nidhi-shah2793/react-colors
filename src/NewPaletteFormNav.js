import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PaletteNameDialog from "./PaletteNameDialog";
import { DRAWER_WIDTH as drawerWidth } from "./constants";

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
  },
  hide: {
    display: "none",
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "0",
    },
  },
  btn: {
    margin: "0 0.5rem",
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
  const theme = useTheme();

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
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/">
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
            >
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
