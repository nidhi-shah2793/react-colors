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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const drawerWidth = 400;

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
  navBtns: {},
}));

function NewPaletteFormNav({
  palettes,
  savePalette,
  colors,
  open,
  handleDrawerOpen,
}) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const [paletteName, setPaletteName] = useState("");

  const handlePaletteNameChange = (event) => {
    setPaletteName(event.target.value);
  };

  const handleSavePalette = () => {
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      // emoji: ,
      colors: colors,
    };
    savePalette(newPalette);
    history.push("/");
  };

  ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
    palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    )
  );

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
          <ValidatorForm
            onSubmit={handleSavePalette}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              onChange={handlePaletteNameChange}
              value={paletteName}
              label="Palette Name"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name!", "Name already used!"]}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}

export default NewPaletteFormNav;
