import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { ChromePicker } from "react-color";
import CreateColorBox from "./CreateColorBox";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    marginTop: "0",
    height: "8vh",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState([
    { name: "Colt Purple", color: "purple" },
    { name: "Lemongrass Green", color: "#C6D747" },
  ]);

  const [background, setBackground] = useState("#377ED1");
  const [colorName, setColorName] = useState("");
  const [paletteName, setPaletteName] = useState("");

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const handleColorNameChange = (event) => {
    setColorName(event.target.value);
  };

  const handlePaletteNameChange = (event) => {
    setPaletteName(event.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const newColor = {
      name: colorName === "" ? background : colorName,
      color: background,
    };
    setColors([...colors, newColor]);
    setColorName("");
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

  ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );

  ValidatorForm.addValidationRule("isColorUnique", (value) =>
    colors.every(({ color }) => color !== background)
  );

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
            Persistent drawer
          </Typography>
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
        </Toolbar>
      </AppBar>
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
            style={{ backgroundColor: "#e9edf0", color: "#da4181" }}
          >
            Random Color
          </Button>
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
        </div>
        <ChromePicker
          color={background}
          onChangeComplete={handleChangeComplete}
        />
        <ValidatorForm
          onSubmit={addNewColor}
          onError={(errors) => console.log(errors)}
        >
          <TextValidator
            onChange={handleColorNameChange}
            value={colorName}
            validators={["isColorNameUnique", "isColorUnique"]}
            errorMessages={["Color name already used!", "Color already used!"]}
          />
          <p>
            Get creative with your color names. Don't worry! If you don't add
            one, we will assume you were busy and display the HEX code instead
          </p>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ backgroundColor: background }}
          >
            ADD COLOR
          </Button>
        </ValidatorForm>

        {/* <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {colors.map((color) => (
          <CreateColorBox key={color.color} {...color} />
        ))}
      </main>
    </div>
  );
}

export default NewPaletteForm;
