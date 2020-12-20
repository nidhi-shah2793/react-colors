import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColorBtn: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
}));

function NewPaletteFormColorPicker({ colors, addNewColor, maxColors }) {
  const classes = useStyles();
  const theme = useTheme();
  const [background, setBackground] = useState("#377ED1");
  const [colorName, setColorName] = useState("");

  ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
    colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
  );

  ValidatorForm.addValidationRule("isColorUnique", (value) =>
    colors.every(({ color }) => color !== background)
  );

  const handleSubmit = () => {
    const newColor = {
      name: colorName === "" ? background : colorName,
      color: background,
    };
    addNewColor(newColor);
    setColorName("");
  };

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const handleColorNameChange = (event) => {
    setColorName(event.target.value);
  };

  return (
    <div className={classes.container}>
      <ChromePicker
        color={background}
        onChangeComplete={handleChangeComplete}
        className={classes.picker}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          variant="filled"
          placeholder="Color Name"
          className={classes.colorNameInput}
          onChange={handleColorNameChange}
          value={colorName}
          margin="normal"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Entering a badass color name is necessary!",
            "Color name already used!",
            "Color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={
            colors.length >= maxColors
              ? { backgroundColor: "gray", color: "white" }
              : { backgroundColor: background }
          }
          disabled={colors.length >= maxColors}
          className={classes.addColorBtn}
        >
          {colors.length >= maxColors ? "PALETTE FULL" : "ADD COLOR"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default NewPaletteFormColorPicker;
