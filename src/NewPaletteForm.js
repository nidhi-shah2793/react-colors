import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import NewPaletteFormNav from "./NewPaletteFormNav";
import NewPaletteFormColorPicker from "./NewPaletteFormColorPicker";

const drawerWidth = 400;
const maxColors = 20;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "90vh",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NewPaletteForm({ savePalette, palettes }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);

  const clearPalette = () => {
    setColors([]);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const addRandomColor = () => {
    const allColors = palettes.map((palette) => palette.colors).flat();
    let randomColorIndex = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[randomColorIndex];
    let condition1 = colors.every(({ color }) => color !== randomColor.color);
    let condition2 = colors.every(
      ({ name }) => name.toLowerCase() !== randomColor.name.toLowerCase()
    );
    if (condition1 && condition2 && colors.length < maxColors)
      setColors([...colors, randomColor]);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const deleteColor = (colorName) => {
    const filtered = colors.filter((color) => color.name !== colorName);
    setColors(filtered);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <NewPaletteFormNav
        colors={colors}
        palettes={palettes}
        savePalette={savePalette}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            style={{ backgroundColor: "#e9edf0", color: "#da4181" }}
            disabled={colors.length >= maxColors}
          >
            Random Color
          </Button>
          <Button variant="contained" color="secondary" onClick={clearPalette}>
            Clear Palette
          </Button>
        </div>
        <NewPaletteFormColorPicker
          colors={colors}
          addNewColor={addNewColor}
          maxColors={maxColors}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          axis="xy"
          colors={colors}
          deleteColor={deleteColor}
          onSortEnd={onSortEnd}
          distance={1}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
